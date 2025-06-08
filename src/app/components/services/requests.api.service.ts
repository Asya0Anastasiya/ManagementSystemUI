import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Request } from "../requests/types/request.model";
import { SoftwareRequest } from "../requests/types/software-request.model";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class RequestsApiService {

	private apiUrl = environment.apiUrl;
	constructor(private http: HttpClient) { }

	getAllRequests(userId: string) : Observable<Request[]> {
		return this.http.get<Request[]>(`${this.apiUrl}getAllRequests/${userId}`);
	}

	getSoftwareRequest(id: string) : Observable<SoftwareRequest> {
		return this.http.get<SoftwareRequest>(`${this.apiUrl}getSoftwareRequest/${id}`);
	}

	getAdminsNames(departmentName: string) : Observable<string[]> {
		return this.http.get<string[]>(`${this.apiUrl}getAdminsNames/${departmentName}`);
	}
}
