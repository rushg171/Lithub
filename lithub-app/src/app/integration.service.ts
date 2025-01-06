import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { IntegrationDetails } from './models/integration-details.model';
import { InsightsRowModel } from './models/insights-row.model';
import { RepoInsights } from './models/repo-insight.model';
import { RepoRowModel } from './models/repo-row.model';
import { Repository } from './models/repo.model';
import { RepoSearchResult } from './models/repo-search-result.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000/github-integration"

  getIntegrationDetails(): Observable<IntegrationDetails> {
    return this.http.get<IntegrationDetails>(this.baseUrl, { withCredentials: true });
  }

  deleteIntegrationDetails(): Observable<IntegrationDetails> {
    return this.http.delete<IntegrationDetails>(this.baseUrl, { withCredentials: true });
  }

  getReposForAllOrgs(): Observable<RepoRowModel[]> {

    return this.getIntegrationDetails().pipe(
      switchMap((user: IntegrationDetails) => {
        const includedRepoIds = user.includedRepos.map(repo=>repo.id);
        return this.http.get<Repository[]>(`${this.baseUrl}/repos-for-all-orgs`, { withCredentials: true })
          .pipe(
            map(repos => repos.map(repo => {
              return {
                id: repo.id,
                name: repo.name,
                avatarUrl: repo.owner.avatar_url,
                ownerUrl: repo.owner.html_url,
                link: repo.html_url,
                slug: repo.full_name,
                included: includedRepoIds.includes(repo.id) ?? false,
              }
            }))
          )
      }));
  }

  searchRepos(searchTerm: string): Observable<RepoRowModel[]> {
    return this.getIntegrationDetails().pipe(
      switchMap((user: IntegrationDetails) => {
        const includedRepoIds = user.includedRepos.map(repo=>repo.id);
        return this.http.get<RepoSearchResult[]>(`${this.baseUrl}/repos-search?search_term=${searchTerm}`, { withCredentials: true })
          .pipe(
            map(repos => repos.map(repo => {
              return {
                id: repo.id,
                name: repo.name,
                avatarUrl: repo.owner.avatar_url,
                ownerUrl: repo.owner.html_url,
                link: repo.html_url,
                slug: repo.full_name,
                included: includedRepoIds.includes(repo.id) ?? false,
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


  updateIncludedRepos(repoList: { id: number, full_name: string }[]) {
    let body = { includedRepos: repoList };
    this.http.patch(`${this.baseUrl}/included-repos`, body, { withCredentials: true }).subscribe(result => {
      console.log(result);
    })
  }
}
