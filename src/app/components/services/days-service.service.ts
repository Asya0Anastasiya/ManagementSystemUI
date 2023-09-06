import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DaysAccounting } from 'src/app/models/daysAccounting.model';
import { DaysFiltering } from 'src/app/models/daysFiltering.model';
import { UsersDaysInfo } from 'src/app/models/usersDaysInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = "https://localhost:44367/api/DayAccounting/";

  getUsersDaysInfo(userId: string) : Observable<UsersDaysInfo> {
    return this.http.get<UsersDaysInfo>(`${this.baseUrl}getUsersDaysInfo/${userId}/month/12/year/2023`);
  }

  approveDay(dayAccounting: DaysAccounting){
    return this.http.put<DaysAccounting>(`${this.baseUrl}approveDay`, dayAccounting);
  }

  getUsersDays(httpParams: HttpParams) : Observable<DaysAccounting[]> {
    debugger
    return this.http.get<DaysAccounting[]>(`${this.baseUrl}getUsersDays/pageNumber/1/pageSize/5`, {params: httpParams});
  }

  postDay(dayObj: any) : Observable<DaysAccounting> {
    debugger
    return this.http.post<DaysAccounting>(`${this.baseUrl}addDay`, dayObj);
  }

  postDays(dayObjs: DaysAccounting[]) : Observable<DaysAccounting[]> {
    debugger
    return this.http.post<DaysAccounting[]>(`${this.baseUrl}addDays`, dayObjs);
  }
}
