import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community'
import { InsightsRowModel } from '../../models/insights-row.model';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-insights-grid',
  imports: [AgGridAngular],
  templateUrl: './insights-grid.component.html',
  styleUrl: './insights-grid.component.css'
})
export class InsightsGridComponent {
  @Input() rowData!: InsightsRowModel[];

  colDefs: ColDef[] = [
    {headerName: "User ID", field: "userId"},
    {headerName: "User", field: "user"},
    {headerName: "Total Commits", field: "totalCommits"},
    {headerName: "Total Pulls", field: "totalPulls"},
    {headerName: "Total Issues", field: "totalIssues"},
  ]

  onGridReady(params: any){
    params.api.sizeColumnsToFit();
  }
}
