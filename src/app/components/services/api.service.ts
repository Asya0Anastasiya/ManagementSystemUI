import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Employee } from "src/app/components/shared/types/employee.model";
import { Observable } from "rxjs";
import { ChangePassword } from "src/app/components/edit-profile/types/changePassword.model";
import { ChangePermissionModel } from "../user-profile/types/changePermission.model";
import { ChangePositionModel } from "../user-profile/types/changePosition.model";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getUsers(httpParams: HttpParams, pageNumber: number, pageSize: number){
		return this.http.get(`${this.apiUrl}getUsers/pageNumber/${pageNumber}/pageSize/${pageSize}`, { observe: "response", params: httpParams });
	}

	getUser(id: string) : Observable<Employee>{
		return this.http.get<Employee>(`${this.apiUrl}getUser/${id}`);
	}

	deleteUser(id: string) : Observable<Employee> {
		return this.http.delete<Employee>(`${this.apiUrl}removeUser/${id}`);
	}

	updateUser(model: any) {
		return this.http.put(`${this.apiUrl}updateUser`, model);
	}

	setUserImage(userId: string, file: FormData) {
		return this.http.post(`${this.apiUrl}setUserImage/${userId}`, file);
	}

	getUserImage(userId: string) : Observable<Blob> {
		return this.http.get(`${this.apiUrl}getUserImage/${userId}`, { responseType: "blob" });
	}

	changePassword(changePasswordModel: ChangePassword) {
		return this.http.put(`${this.apiUrl}changePassword`, changePasswordModel);
	}

	changeUserPermissions(changePermissionModel: ChangePermissionModel) {
		return this.http.post(`${this.apiUrl}changeUserPermissions`, changePermissionModel);
	}

	changeUserPosition(changePositionModel: ChangePositionModel) {
		return this.http.post(`${this.apiUrl}changeUserPosition`, changePositionModel);
	}
}
