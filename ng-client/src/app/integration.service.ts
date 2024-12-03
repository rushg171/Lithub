import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { IntegrationDetails } from './models/integration-details.model';
import { RepoRowModel } from './models/repo-row.model';
import { Repository } from './models/repo.model';
import { RepoInsights } from './models/repo-insight.model';
import { InsightsRowModel } from './models/insights-row.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:3000/github-integration"

  getIntegrationDetails():Observable<IntegrationDetails>{
    return this.http.get<IntegrationDetails>(this.baseUrl,{withCredentials:true});
  }

  deleteIntegrationDetails():Observable<IntegrationDetails>{
    return this.http.delete<IntegrationDetails>(this.baseUrl,{withCredentials:true});
  }

  getReposForAllOrgs():Observable<RepoRowModel[]>{
    
    return this.getIntegrationDetails().pipe(
      switchMap((user: IntegrationDetails)=>{
      return this.http.get<Repository[]>(`${this.baseUrl}/repos-for-all-orgs`, {withCredentials:true})
      .pipe(
        map(repos=>repos.map(repo=>{
          return {
            id: repo.id,
            name: repo.name,
            link: repo.html_url,
            slug: repo.full_name,
            included: user?.includedRepos.includes(repo.id)??false,
          }
        }))
      )
    }));
  }

  getInsights(): Observable<InsightsRowModel[]> {
    return this.getIntegrationDetails().pipe(
      switchMap((user: IntegrationDetails) => {
        // Initialize the insights object
        const initialInsights: InsightsRowModel = {
          userId: user.username,
          user: user.name,
          totalCommits: 0,
          totalPulls: 0,
          totalIssues: 0,
        };
  
        // Fetch repository insights
        return this.http.get<RepoInsights[]>(`${this.baseUrl}/insights`, { withCredentials: true }).pipe(
          map((repoInsightsList) => this.aggregateInsights(initialInsights, repoInsightsList))
        );
      })
    );
  }
  
  // Helper function to aggregate repository insights
  private aggregateInsights(
    insights: InsightsRowModel,
    repoInsightsList: RepoInsights[]
  ): InsightsRowModel[] {
    for (const repoInsights of repoInsightsList) {
      insights.totalCommits += repoInsights.commitCount ?? 0;
      insights.totalIssues += repoInsights.issueCount ?? 0;
      insights.totalPulls += repoInsights.pullCount ?? 0;
    }
    return [insights];
  }
  

  updateIncludedRepos(repoList: number[]){
    let body = {includedRepos: repoList};
    this.http.patch(`${this.baseUrl}/included-repos`, body, {withCredentials:true} ).subscribe(result=>{
      console.log(result);
    })
  }
}
