import { Component, OnInit } from '@angular/core';
import { IntegrationDetails } from '../models/integration-details.model';
import { IntegrationService } from '../integration.service';
import { RepoRowModel } from '../models/repo-row.model';
import { InsightsRowModel } from '../models/insights-row.model';

@Component({
  selector: 'app-github-integration',
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css']
})
export class GithubIntegrationComponent {
  panelOpenState:boolean = false;
  integrationDetails:IntegrationDetails|null = null;
  repos:RepoRowModel[]=[];
  insights: InsightsRowModel[]=[];

  constructor(private integrationService:IntegrationService){}

  ngOnInit():void{
    this.getIntegrationDetails();
    this.fetchAllRepos();
    this.fetchLiveInsights();
  }

  logCurrentRowsData():void{
    console.log(this.repos);
  }

  getIntegrationDetails():void{
    this.integrationService.getIntegrationDetails().subscribe(result=>{
      this.integrationDetails = result;
    })
  }

  deleteIntegrationDetails():void{
    this.integrationService.deleteIntegrationDetails().subscribe((result)=>{
      console.log(result);
      this.integrationDetails = null;
      this.insights = [];
      this.repos = [];
    })
  }

  fetchAllRepos():void{
    this.integrationService.getReposForAllOrgs().subscribe((result)=>{
      console.log(result);
      this.repos = result;
    })
  }

  fetchLiveInsights():void{
    this.integrationService.getInsights().subscribe((result)=>{
      console.log(result);
      this.insights = result;
    })
  }

  onListUpdated():void{
    const includedRepos:number[] = this.repos
    .filter(row=>row.included)
    .map(row=>row.id);
    
    this.integrationService.updateIncludedRepos(includedRepos);
    this.fetchLiveInsights();

  }
  
}
