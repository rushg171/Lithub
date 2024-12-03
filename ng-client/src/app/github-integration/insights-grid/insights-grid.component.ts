import { Component, Input } from '@angular/core';
import { InsightsRowModel } from 'src/app/models/insights-row.model';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-insights-grid',
  templateUrl: './insights-grid.component.html',
  styleUrls: ['./insights-grid.component.css']
})
export class InsightsGridComponent {
  @Input() rowData!: InsightsRowModel[];

  columnDefs: ColDef[] = [
    {headerName: 'userId', field: 'userId'},
    {headerName: 'User', field: 'user'},
    {headerName: 'Total Commits', field: 'totalCommits'},
    {headerName: 'Total Pull Requests', field: 'totalPulls'},
    {headerName: 'Total Issues', field: 'totalIssues',},
  ];

  defaultColDef = {
    resizable: true, // Allows column resizing to fit content
  };

  onGridReady(params: any) {
    params.api.sizeColumnsToFit(); // Adjusts the grid's columns to fit the container width
  }
}
