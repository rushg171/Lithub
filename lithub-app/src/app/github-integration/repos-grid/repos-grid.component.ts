import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { RepoRowModel } from '../../models/repo-row.model';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { LinkRenderer } from '../grid-cell-components/linkRenderer.component';
import { LogoRenderer } from '../grid-cell-components/imageRenderer.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-repos-grid',
  imports: [AgGridAngular],
  templateUrl: './repos-grid.component.html',
  styleUrl: './repos-grid.component.css'
})
export class ReposGridComponent {

  colDefs: ColDef[] = [
    { headerName: 'Id', field: 'id' },
    { headerName: "Owner", field: 'avatarUrl', cellRenderer: LogoRenderer},
    { headerName: 'Name', field: 'name', cellRenderer: LinkRenderer },
    { headerName: 'Slug', field: 'slug' },
    { headerName: 'Included', field: 'included', editable: true },
  ];

  @Input() rowData!: RepoRowModel[];
  @Output() listUpdated = new EventEmitter<void>();


  defaultColDef = {
    resizable: true, // Allows column resizing to fit content
  };

  onGridReady(params: any) {
    params.api.sizeColumnsToFit(); // Adjusts the grid's columns to fit the container width
  }

  onCellValueChanged(params: any) {
    this.listUpdated.emit();
  }
}
