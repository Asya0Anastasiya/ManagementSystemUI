import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../components/services/auth.service";

@Injectable({
	providedIn: "root"
})

export class AuthGuard implements CanActivate{

	constructor(private auth: AuthService, private router: Router){}

	canActivate(): boolean {
		if (this.auth.isLoggedIn()) {
			return true;
		} else 
		{ 
			this.router.navigate(["login"]);
			return false; 
		}
	}
}
