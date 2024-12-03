import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GithubCallbackComponent } from './github-callback/github-callback.component';
import { GithubIntegrationComponent } from './github-integration/github-integration.component';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { AgGridModule } from 'ag-grid-angular';

import { GithubCombinedLogo } from './components/githubCombinedLogo.component';
import { RepoGridComponent } from './github-integration/repo-grid/repo-grid.component';
import { InsightsGridComponent } from './github-integration/insights-grid/insights-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubCallbackComponent,
    GithubIntegrationComponent,
    GithubCombinedLogo,
    RepoGridComponent,
    InsightsGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, 
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
