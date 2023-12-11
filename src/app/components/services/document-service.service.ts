import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDocument } from "src/app/models/document.model";

@Injectable({
	providedIn: "root"
})
export class DocumentServiceService {

	constructor(private http: HttpClient) { }

	private baseUrl: string = "https://localhost:44339/";

	downloadUserDocument(fileName: string, userId: string) : Observable<any> {
		return this.http.get(`${this.baseUrl}downloadUserDocument/${fileName}/${userId}`, { responseType: "blob"});
	}

	uploadUserDocument(formData: FormData) {
		return this.http.post<any>(`${this.baseUrl}uploadUserDocument`, formData);
	}

	getUserDocuments(userId: string) : Observable<UserDocument[]> {
		return this.http.get<UserDocument[]>(`${this.baseUrl}getUserDocuments/${userId}`);
	}

	getUserDocumentsNames(userId: string) : Observable<string[]> {
		return this.http.get<string[]>(`${this.baseUrl}getAllUsersTimeTrackingDocs/${userId}`);
	}

	attachDocument(userId: string, date: Date, name: string) {
		const body = JSON.stringify({ name: name , date: date}); 

		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		return this.http.post(`${this.baseUrl}attachDocument/${userId}`, body, {headers});
	}
}
