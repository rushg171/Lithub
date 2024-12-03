import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorizationCallback } from '../models/authorizationCallback.model';

@Component({
  selector: 'app-github-callback',
  templateUrl: './github-callback.component.html',
  styleUrls: ['./github-callback.component.css']
})
export class GithubCallbackComponent {
  code:string|null = null
  authorizationCallbackResult:AuthorizationCallback|null= null;
  
  constructor(private route: ActivatedRoute, private router:Router, private authService: AuthService){}

  ngOnInit():void{
    this.route.queryParams.subscribe(params=>{
      this.code = params['code'];
    });
    if(!this.code) {
      this.router.navigate(['github']);
      return;
    };
    this.getAuthorizationFromCallback(this.code);
  }

  getAuthorizationFromCallback(code:string):void{
    this.authService.authorizeAndRegisterUser(code).subscribe((authResult)=>{
        this.authorizationCallbackResult = authResult;
        console.log(authResult);
        this.router.navigate(['github'])
    })
  }
}
