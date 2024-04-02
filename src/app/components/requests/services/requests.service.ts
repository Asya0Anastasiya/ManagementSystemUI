import { Injectable } from "@angular/core";
import { Request } from "../types/request.model";
import { RequestsApiService } from "../../services/requests.api.service";
import { AuthService } from "../../services/auth.service";

@Injectable({
	providedIn: "root"
})
export class RequestsService {

	constructor(private requestApi: RequestsApiService, private auth: AuthService) {
		this.id = this.auth.getIdFromToken();
	}

	requests: Request[] = [];
	id: string = "";

	getAllRequests() {
		this.requestApi.getAllRequests(this.id).subscribe({
			next: (res) => {
				this.requests = res;
			},
			error: (error) => {
				console.log(error);
			}
		});
	}
}
