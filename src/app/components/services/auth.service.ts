import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:44307/api/User/";
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}create`, userObj);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}signin`, loginObj)
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService;
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getEmailFromToken(){
    if (this.userPayload)
    return this.userPayload.email;
  }

  getRoleFromToken(){
    if (this.userPayload)
    return this.userPayload.role;
  }

  getIdFromToken(){
    if (this.userPayload){
      return this.userPayload.nameid;
    }
  }
}
