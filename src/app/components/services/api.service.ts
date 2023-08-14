import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://localhost:44307/api/User/";

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
