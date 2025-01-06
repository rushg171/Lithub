import { Routes } from '@angular/router';
import { GithubIntegrationComponent } from './github-integration/integration.component';
import {GithubCallbackComponent} from './github-callback/callback.component';
import { CollectionDataComponent } from './collection-data/collection-data.component';

export const routes: Routes = [
    {
        path: "github",
        component: GithubIntegrationComponent
    },
    {
        path: "github-callback",
        component: GithubCallbackComponent
    },
    {
        path: "collection-data",
        component: CollectionDataComponent
    }
];
