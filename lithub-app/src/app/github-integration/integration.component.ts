import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { IntegrationService } from '../integration.service';
import { IntegrationDetails } from '../models/integration-details.model';
import { ReposGridComponent } from "./repos-grid/repos-grid.component";
import { RepoRowModel } from '../models/repo-row.model';
import { InsightsRowModel } from '../models/insights-row.model';
import { InsightsGridComponent } from "./insights-grid/insights-grid.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import "./styles.css"

@Component({
  selector: 'github-integration',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonToggleModule, MatButtonModule, MatExpansionModule, MatIconModule, ReposGridComponent, InsightsGridComponent],
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GithubIntegrationComponent {
  title = 'Connect to Github';
  searchFrom = "user-account";
  prevSearchValue = "";
  loading:boolean=false;

  constructor(private integrationService: IntegrationService) {

  }
  panelOpenState = signal(false);

  redirectToConnect() {
    console.log("Connecting...");
  }

  searchTerm: string = ""

  integrationDetails: IntegrationDetails | null = null;
  allOrgRepos: RepoRowModel[] = [];
  insights: InsightsRowModel[] = [];

  ngOnInit(): void {
    this.getIntegrationDetails();
    this.getAllOrgRepos();
    this.fetchLiveInsights();
  }

  onSearchToggleValueChange(event: any): void {
    this.searchFrom = event.value;
    if (this.searchFrom === "global-search") {
      this.allOrgRepos = [];
    }
    if (this.searchFrom === "user-account") {
      this.getAllOrgRepos();
    }
  }

  handleSearch(params: any) {
    console.log(this.searchTerm);
    this.integrationService.searchRepos(this.searchTerm).subscribe(result => {
      this.allOrgRepos = result;
    })

  }

  getIntegrationDetails(): void {
    this.integrationService.getIntegrationDetails().subscribe((result) => {
      this.integrationDetails = result;
      console.log(result);
    })
  }

  deleteIntegrationDetails(): void {
    this.integrationService.deleteIntegrationDetails().subscribe((result) => {
      console.log(result);
      this.integrationDetails = null;
    })
  }

  getAllOrgRepos(): void {
    this.integrationService.getReposForAllOrgs().subscribe((result) => {
      console.log(result);
      if (this.searchFrom != "user-account") return;
      this.allOrgRepos = result;
    })
  }

  fetchLiveInsights(): void {
    if(this.integrationDetails) this.loading=true;
    this.integrationService.getInsights().subscribe((result) => {
      console.log(result);
      this.insights = result;
      this.loading=false;
    })
  }

  onListUpdated(): void {
    console.log(this.searchFrom);
    const includedRepos: { id: number, full_name: string }[] = this.allOrgRepos
      .filter(row => row.included)
      .map(row => { return { id: row.id, full_name: row.slug } });

    this.integrationService.updateIncludedRepos(includedRepos);
    this.fetchLiveInsights();
  }
}
