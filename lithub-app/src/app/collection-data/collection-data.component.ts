import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicGridComponent } from '../grids/dynamic-grid/dynamic-grid.component';
import { CollectionRepository } from '../models/collections/repo.model';
import { CollectionService } from '../collection.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-collection-data',
  imports: [DynamicGridComponent, MatInputModule, FormsModule, MatSelectModule, MatFormFieldModule, MatButton],
  templateUrl: './collection-data.component.html',
  styleUrl: './collection-data.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CollectionDataComponent {
  constructor(private collectionService: CollectionService) {
    collectionService.findRepos(1, 30).subscribe(result => {
      this.gridData = result;
      this.loading = false;
    })
  }
  loading: boolean = true;
  searchTerm: string = '';
  integrationSelected = 'github';
  entitySelected = "repos";
  gridData: any[] = [];
  filterText: string = "";

  currentPage: number = 1;
  totalPages: number = 100;

  nextButtonClick() {
    this.currentPage++;
    this.updateGridData();
  }

  prevButtonClick() {
    this.currentPage--;
    this.updateGridData();
  }

  entitySelectionChanged() {
    this.updateGridData()
  }

  onFilterTextBoxChanged() {
    this.filterText = this.searchTerm;
  }

  updateGridData = async () => {

    switch (this.entitySelected) {
      case "repos":
        this.collectionService.findRepos(this.currentPage, 30).subscribe(res => this.gridData = res);
        break;
      case "github-integrations":
        this.collectionService.findGithubIntegrations(this.currentPage, 30).subscribe(res => this.gridData = res);
        break;
      case "commits":
        this.collectionService.findCommits(this.currentPage, 30).subscribe(res => this.gridData = res);
        break;
      case "pull-requests":
        this.collectionService.findPullRequests(this.currentPage, 30).subscribe(res => this.gridData = res);
        break;
      case "issues":
        this.collectionService.findIssues(this.currentPage, 30).subscribe(res => this.gridData = res);
        break;
      default:
        console.log("Select Something");
    }

  }

}
