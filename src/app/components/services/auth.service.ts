/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticatedResponse } from "src/app/models/authenticatedResponse.model";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	private baseUrl: string = "https://localhost:44339/";
	private userPayload: any;
  
	constructor(private http: HttpClient, private router: Router) { 
		this.userPayload = this.decodeToken();
	}

	signUp(userObj: any){
		return this.http.post<any>(`${this.baseUrl}create`, userObj);
	}

	login(loginObj: AuthenticatedResponse){
		return this.http.post<AuthenticatedResponse>(`${this.baseUrl}signin`, loginObj);
	}

	storeToken(tokenValue: string){
		localStorage.setItem("token", tokenValue);
	}

	storeRefreshToken(refreshTokenValue: string) {
		localStorage.setItem("refreshToken", refreshTokenValue);
	}

	getToken(){
		return localStorage.getItem("token");
	}

	getRefreshToken() {
		return localStorage.getItem("refreshToken");
	}

	isLoggedIn(): boolean{
		return !!localStorage.getItem("token");
	}

	signout(){
		localStorage.clear();
		this.router.navigate(["login"]);
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
			return this.userPayload.scope;
	}

	getIdFromToken(){
		if (this.userPayload){
			return this.userPayload.nameid;
		}
	}

	getDepartmentFromToken(){
		if (this.userPayload){
			return this.userPayload.Department;
		}
	}

	public async tryRefreshingTokens(token: string, refreshToken: string): Promise<boolean> {
		if (!token || !refreshToken) { 
		  return false;
		}
		
		const credentials = JSON.stringify({refreshToken: refreshToken });
		let isRefreshSuccess: boolean;
	  
		const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
		  this.http.post<AuthenticatedResponse>("https://localhost:44339/refreshTokenVerification", credentials, {
			// 	headers: new HttpHeaders({
			//   "Content-Type": "application/json"
			// 	})
		  }).subscribe({
				next: (res: AuthenticatedResponse) => resolve(res),
				error: (_) => 
				{ 
					reject; 
					isRefreshSuccess = false; 
					this.router.navigate(["login"]);
					alert("Please login again"); 
				}
		  });
		});
	  
		localStorage.setItem("token", refreshRes.token);
		localStorage.setItem("refreshToken", refreshRes.refreshToken);
		isRefreshSuccess = true;
	  
		return isRefreshSuccess;
	  }
}
