import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DaysAccounting } from "src/app/components/shared/types/daysAccounting.model";
import { DocumentWithSourceId } from "src/app/models/documentWithSourceId.model";
import { UsersDaysInfo } from "src/app/models/usersDaysInfo.model";

@Injectable({
	providedIn: "root"
})
export class DaysService {

	constructor(private http: HttpClient) {}

	private baseUrl: string = "https://localhost:44339/";

	getUsersDaysInfo(userId: string, month: number, year: number) : Observable<UsersDaysInfo> {
		return this.http.get<UsersDaysInfo>(`${this.baseUrl}getUsersDaysInfo/${userId}/month/${month}/year/${year}`);
	}

	approveDay(id: string){
		return this.http.get<DaysAccounting>(`${this.baseUrl}approveDay/${id}`);
	}

	getUsersDays(httpParams: HttpParams) {
		return this.http.get(`${this.baseUrl}getUsersDays`, { observe: "response", params: httpParams });
	}

	postDay(dayObj: any) : Observable<DaysAccounting> {
		return this.http.post<DaysAccounting>(`${this.baseUrl}addDay`, dayObj);
	}

	postDays(dayObjs: DaysAccounting[]) : Observable<DaysAccounting[]> {
		return this.http.post<DaysAccounting[]>(`${this.baseUrl}addDays`, dayObjs);
	}

	getUnconfirmedDaysCount(id: string) : Observable<number> {
		return this.http.get<number>(`${this.baseUrl}getUnconfirmedDaysCount/${id}`);
	}

	removeDay(id: string) {
		return this.http.delete(`${this.baseUrl}removeDay/${id}`);
	}

	getUserDocumentsNames(userId: string, params: HttpParams) : Observable<DocumentWithSourceId[]> {
		return this.http.get<DocumentWithSourceId[]>(`${this.baseUrl}getUsersDocuments/${userId}`, {params: params});
	}
}
