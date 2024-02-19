import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDocument } from "src/app/components/user-document/types/document.model";
import { DocumentInfo } from "src/app/components/user-profile/types/documentInfo.model";

@Injectable({
	providedIn: "root"
})
export class DocumentServiceService {

	constructor(private http: HttpClient) { }

	private baseUrl: string = "https://localhost:44339/";

	downloadUserDocument(documentId: string, userId: string) : Observable<any> {
		return this.http.get(`${this.baseUrl}downloadUserDocument/${documentId}/${userId}`, { responseType: "blob"});
	}

	uploadUserDocument(formData: FormData) {
		return this.http.post<any>(`${this.baseUrl}uploadUserDocument`, formData);
	}

	getUserDocuments(userId: string) : Observable<UserDocument[]> {
		return this.http.get<UserDocument[]>(`${this.baseUrl}getUserDocuments/${userId}`);
	}

	getUserDocumentsNames(userId: string) : Observable<DocumentInfo[]> {
		return this.http.get<DocumentInfo[]>(`${this.baseUrl}getAllUsersTimeTrackingDocs/${userId}`);
	}

	attachDocument(userId: string, date: Date, documentId: string) {
		const body = JSON.stringify({ documentId: documentId , date: date}); 

		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		
		return this.http.post(`${this.baseUrl}attachDocument/${userId}`, body, {headers});
	}
}
