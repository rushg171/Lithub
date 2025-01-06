import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRepository } from './models/collections/repo.model';
import { Commit } from './models/collections/commit.model';
import { Issue } from './models/collections/issue.model';
import { PullRequest } from './models/collections/pull.model';
import { IntegrationDetails } from './models/integration-details.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000/collections"

  findGithubIntegrations(page: number, per_page: number): Observable<IntegrationDetails[]> {
    return this.http.get<IntegrationDetails[]>(this.baseUrl + "/integrations", { withCredentials: true, params: { page, per_page } });
  }

  findRepos(page: number, per_page: number): Observable<CollectionRepository[]> {
    return this.http.get<CollectionRepository[]>(this.baseUrl + "/repos", { withCredentials: true, params: { page, per_page } });
  }

  findCommits(page: number, per_page: number): Observable<Commit[]> {
    return this.http.get<Commit[]>(this.baseUrl + "/commits", { withCredentials: true, params: { page, per_page } });
  }

  findIssues(page: number, per_page: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl + "/issues", { withCredentials: true, params: { page, per_page } });
  }

  findPullRequests(page: number, per_page: number): Observable<PullRequest[]> {
    return this.http.get<PullRequest[]>(this.baseUrl + "/pulls", { withCredentials: true, params: { page, per_page } });
  }
}
