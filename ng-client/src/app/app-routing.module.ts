import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubIntegrationComponent } from './github-integration/github-integration.component';
import { GithubCallbackComponent } from './github-callback/github-callback.component';

const routes: Routes = [
  {
    path: "github",
    component: GithubIntegrationComponent
  },
  {
    path: "github-callback",
    component: GithubCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
