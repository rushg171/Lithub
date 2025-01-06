import { Component, CUSTOM_ELEMENTS_SCHEMA, signal} from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgOptimizedImage } from '@angular/common';
import { GithubIntegrationComponent } from './github-integration/integration.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lithub-app';
}
