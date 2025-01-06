import { Component, input, Input, SimpleChanges } from '@angular/core';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { RowGroupingModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule]);

@Component({
  selector: 'app-dynamic-grid',
  imports: [AgGridAngular],
  templateUrl: './dynamic-grid.component.html',
  styleUrl: './dynamic-grid.component.css'
})

export class DynamicGridComponent {
  
  @Input() data!: any[];
  @Input() filterText!: string;
  rowData:any= [];
  private gridApi!: GridApi<any>;
  colDefs: (ColDef | ColGroupDef)[] = [];

  ngOnInit():void{
  }

  onGridReady(params: any){
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    // this.onButtonClick(this.rowData);
    this.setRowData();
    this.setColDefs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateGrid();
    }

    if (changes['filterText'] && !changes['filterText'].firstChange) {
      console.log(this.filterText);
      this.gridApi.setGridOption("quickFilterText", this.filterText);
    }
  }

  // Updates the grid with new row and column data
  updateGrid() {
    if (!this.data || this.data.length === 0) return;
    this.setRowData();
    this.setColDefs();
  }

  onButtonClick(rowData: any){
    this.gridApi.setGridOption("columnDefs", [])
  }

  setRowData(){
    this.rowData = this.data.map((item)=>this.addToRow(item, null));
    this.gridApi.setGridOption("rowData", this.rowData);
  }

  setColDefs(){
    this.colDefs = this.addToColDefGrouped(this.data[0], null);
    this.gridApi.setGridOption("columnDefs", this.colDefs);
  }

  addToColDef(data: any, parentKey: string|null):{[key:string]:any}[]{
    let cols:{[key:string]:any}[] = [];
    for(let key in data){
      let val = data[key];

      if(typeof(val)==="object" && !Array.isArray(val)){
        let res = this.addToColDef(val, parentKey?parentKey+"_"+key:key);
        cols = [...cols, ...res]
      }else{
        let k = parentKey?parentKey+"_"+key:key;
        cols.push({headerName: k, field: k});
      }
    }
    return cols;
  }

  addToColDefGrouped(data: any, parentKey: string|null):{[key:string]:any}[]{
    let cols:{[key:string]:any}[] = [];
    for(let key in data){
      let val = data[key];

      if(typeof(val)==="object" && !Array.isArray(val)){
        let childCols = this.addToColDefGrouped(val, parentKey?parentKey+"_"+key:key);
        cols.push({headerName: key, groupId: key, children: childCols});
      }else{

        let k = parentKey?parentKey+"_"+key:key;
        let exceptions = ["login", "admin", "name"];
        let rowGroupFields = ["repo","author_id"];
        let oorc= exceptions.includes(key);
        let colDefinition = {headerName: key, field: k, columnGroupShow: oorc?null:'open', rowGroup:false, hide:false};
        if(rowGroupFields.includes(key)) {
          colDefinition.rowGroup = true;
          colDefinition.hide = false;
        }
        cols.push(colDefinition);
      }
    }
    return cols;
  }

  addToRow( data: any, parentKey: string|null):{[key:string]:any}{

    let row:{[key:string]:any} = {};
    for(let key in data){
      let val = data[key];

      if(typeof(val)==="object" && !Array.isArray(val)){
        let res = this.addToRow(val, parentKey?parentKey+"_"+key:key);
        row = {...row, ...res};
      }else{
        row[parentKey?parentKey+"_"+key:key] = val;
      }
    }
    return row;
  }
}
