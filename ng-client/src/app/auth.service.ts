import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationCallback } from './models/authorizationCallback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:3000/auth/github/callback"

  authorizeAndRegisterUser(code:string):Observable<AuthorizationCallback>{
    const params = new HttpParams().set("code",code);
    return this.http.get<AuthorizationCallback>(this.baseUrl,{params, withCredentials: true})
  }
}
