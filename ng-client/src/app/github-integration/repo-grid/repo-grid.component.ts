import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community'
import { RepoRowModel } from 'src/app/models/repo-row.model';
import { LinkRenderer } from '../grid-cell-components/linkRenderer.component';

@Component({
  selector: 'app-repo-grid',
  templateUrl: './repo-grid.component.html',
  styleUrls: ['./repo-grid.component.css']
})
export class RepoGridComponent {
  columnDefs: ColDef[] = [
    {headerName: 'Id', field: 'id'},
    {headerName: 'Name', field: 'name'},
    {headerName: 'Link', field: 'link', cellRenderer: LinkRenderer},
    {headerName: 'Slug', field: 'slug'},
    {headerName: 'Included', field: 'included', editable:true},
  ];

  @Input() rowData!: RepoRowModel[];

  @Output() listUpdated = new EventEmitter<void>();


  defaultColDef = {
    resizable: true, // Allows column resizing to fit content
  };

  onGridReady(params: any) {
    params.api.sizeColumnsToFit(); // Adjusts the grid's columns to fit the container width
  }

  onCellValueChanged(params: any){
    this.listUpdated.emit();
  }
}
