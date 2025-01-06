import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgOptimizedImage } from '@angular/common';
import { AuthorizationCallback } from '../models/authorizationCallback.model';
import { AuthService } from '../auth.service';


@Component({
    selector:"github-callback",
    templateUrl:'./callback.component.html',
    styleUrl:'./callback.component.css',
    imports: [MatCardModule, MatButtonModule, MatExpansionModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class GithubCallbackComponent implements OnInit{
    router = inject(Router);
    authorizationCallbackResult: AuthorizationCallback | null = null
    constructor(private authService: AuthService){}
    
    code = input.required<string>();

    ngOnInit(): void {
        this.getAuthorizationFromCallback(this.code());
    }

    getAuthorizationFromCallback(code:string):void{
        this.authService.authorizeAndRegisterUser(code).subscribe((authResult)=>{
            this.authorizationCallbackResult = authResult;
            console.log(authResult);
            this.router.navigateByUrl("/github")
        })
    }
}