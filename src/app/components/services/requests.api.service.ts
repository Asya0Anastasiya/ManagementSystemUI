import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Request } from "../requests/types/request.model";
import { SoftwareRequest } from "../requests/types/software-request.model";

@Injectable({
	providedIn: "root"
})
export class RequestsApiService {

	constructor(private http: HttpClient) { }

	private baseUrl: string = "https://localhost:44339/";

	getAllRequests(userId: string) : Observable<Request[]> {
		return this.http.get<Request[]>(`${this.baseUrl}getAllRequests/${userId}`);
	}

	getSoftwareRequest(id: string) : Observable<SoftwareRequest> {
		return this.http.get<SoftwareRequest>(`${this.baseUrl}getSoftwareRequest/${id}`);
	}
}
