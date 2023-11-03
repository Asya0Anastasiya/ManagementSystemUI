import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';
import { ChangePassword } from 'src/app/models/changePassword.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // to environment.ts
  private baseUrl: string = "https://localhost:44339/";

  getUsers(httpParams: HttpParams, pageNumber: number, pageSize: number){
    return this.http.get(`${this.baseUrl}getUsers/pageNumber/${pageNumber}/pageSize/${pageSize}`, { observe: 'response', params: httpParams });
  }

  getUser(id: string) : Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}getUser/${id}`);
  }

  deleteUser(id: string) : Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}removeUser/${id}`);
  }

  updateUser(model: any) {
    return this.http.put(`${this.baseUrl}updateUser`, model);
  }

  setUserImage(userId: string, file: FormData) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}setUserImage/${userId}`, file);
  }

  getUserImage(userId: string) : Observable<Blob> {
    return this.http.get(`${this.baseUrl}getUserImage/${userId}`, { responseType: 'blob' });
  }

  changePassword(changePasswordModel: ChangePassword) {
    return this.http.put(`${this.baseUrl}changePassword`, changePasswordModel);
  }
}
