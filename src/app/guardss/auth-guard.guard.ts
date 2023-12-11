/* eslint-disable no-mixed-spaces-and-tabs */
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../components/services/auth.service";
import { inject} from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	debugger
	const router: Router = inject(Router);
	const jwtHelper = new JwtHelperService;
	const authService: AuthService = inject(AuthService);
	const token = authService.getToken();
	const refreshToken = authService.getRefreshToken();
	if (token && !jwtHelper.isTokenExpired(token)){
		return true;
	  }

	  if (token && refreshToken) {
		const isRefreshSuccess = authService.tryRefreshingTokens(token, refreshToken); 
	  	if (!isRefreshSuccess) { 
			router.navigate(["login"]); 
	  	}
	  	return isRefreshSuccess;
	  	}
	return false;
	//return !authService.isLoggedIn() && jwtHelper.isTokenExpired(authService.getToken()) ? router.navigate(["login"]) : true;
};

export const roleGuard: CanActivateFn = () => {
	const authService: AuthService = inject(AuthService);
	const access: boolean = authService.getRoleFromToken() == "Admin";
	if (access) {
		return true;
	}
	else {
		// отдельная страница для Access denied???
		alert("Access denied");
		return false;
	}
};


