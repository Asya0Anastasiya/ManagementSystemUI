import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // to environment.ts
  private baseUrl: string = "https://localhost:44307/api/User/";

  getUsers() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getUser(email: string) : Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}${email}`);
  }
}
