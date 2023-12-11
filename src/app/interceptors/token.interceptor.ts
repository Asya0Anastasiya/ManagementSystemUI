import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../components/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private auth: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const myToken = this.auth.getToken();
		const refreshToken = this.auth.getRefreshToken();
		if (myToken){
			request = request.clone({
				setHeaders: {Authorization: `Bearer ${myToken}`, RefreshToken: `${refreshToken}`}
			});
		}
		return next.handle(request);
	}
}
