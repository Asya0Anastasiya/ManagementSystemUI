import { Injectable } from "@angular/core";
import { Employee } from "../../shared/types/employee.model";
import { DaysFiltering } from "src/app/models/daysFiltering.model";
import { RowWithDocs } from "src/app/models/rowWithDocs.model";
import { RowData } from "src/app/models/rowData.model";
import { DaysAccounting } from "src/app/models/daysAccounting.model";
import { DocumentServiceService } from "../../services/document-service.service";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DaysService } from "../../services/days-service.service";
import { ImageService } from "../../shared/services/image.service";
import { HttpParams } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { catchError, map, startWith, switchMap, of as observableOf } from "rxjs";

@Injectable({
	providedIn: "root"
})

export class UserDetailService {

	constructor(private api: ApiService, 
        private daysService: DaysService,
        private docService: DocumentServiceService, private imageService: ImageService) {}

	userDetails: Employee = {
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		position: "",
		branchOffice: "",
		unConfirmedDaysCount: 0,
		phoneNumber: "",
		workDays: 0,
		sickDays: 0,
		holidays: 0,
		paidDays: 0,
		url: ""
	};

	rows: RowData[] = [];
	rows1: RowWithDocs[] = [];
	totalData!: number;
	selectedFile!: File;
	month: string = "";
	now: Date = new Date;


	daysFilter: DaysFiltering = {
		userId: "", 
		fromDate: new Date,
		tillDate: new Date,
		accountingType: ""
	};

	public days: DaysAccounting[] = [];

	public url: string = "";

	OnInit(route: ActivatedRoute): void {
		this.month = this.getCurrentMonth();
		route.paramMap.subscribe({
			next: (params) =>{
				const id = params.get("id");
				if (id){
					this.initiateDayFilteringParams(id, "");
					this.api.getUser(id).subscribe({
						next: (response) => {
							this.userDetails.id = response.id;
							this.userDetails.firstName = response.firstName;
							this.userDetails.lastName = response.lastName;
							this.userDetails.email = response.email;
						}
					});
					this.daysService.getUsersDaysInfo(id, this.now.getMonth() + 1, this.now.getFullYear()).subscribe({
						next: (res) => {
							this.userDetails.workDays = res.workDaysCount;
							this.userDetails.sickDays = res.sickDaysCount;
							this.userDetails.holidays = res.holidaysCount;
							this.userDetails.paidDays = res.paidDaysCount;
						}
					});
					this.url = this.imageService.initiateUserImage(id, this.api);
				}
			}
		});
	}

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0];
	} 

	onUpload() {
		const formData = new FormData();
		formData.append("file", this.selectedFile);
		this.api.setUserImage(this.userDetails.id, formData).subscribe({
			next: (res) => {
				console.log(res);
			}
		});
		window.location.reload();
	}

	initiateRows(count:number) {
		for (let i = 1; i <= count; i++){
			const row: RowWithDocs = {
				date: "",
				hours: 0,
				type: "",
				status: "",
				color: "",
				id: "",
				docs: []
			};
			this.rows1.push(row);
		}
	}

	downloadDocument(name: string, documentId: string) {
		const ext = name.split(".");
		this.docService.downloadUserDocument(documentId, this.userDetails.id).subscribe(response => {
			const url = window.URL.createObjectURL(new Blob([response]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", ext[0] + "." + ext[1]);
			document.body.appendChild(link);
			link.click();
		});
	}

	AfterViewInit(paginator: MatPaginator, route: ActivatedRoute) {
		paginator.page
			.pipe(
				startWith({}),
				switchMap(() => {
					route.paramMap.subscribe({
						next: (params) =>{
							const id = params.get("id");
							if (id){
								this.initiateDayFilteringParams(id, "");
								this.api.getUser(id).subscribe({
									next: (response) => {
										this.userDetails.id = response.id;
									}
								});
							}
						}
					});
					let httpParams = new HttpParams();
					httpParams = httpParams.set("userId", this.daysFilter.userId);
					httpParams = httpParams.set("tillDate", `${this.daysFilter.tillDate.getFullYear()}-${this.daysFilter.tillDate.getMonth() + 1}-${paginator.pageSize * (paginator.pageIndex + 1)}`);
					httpParams = httpParams.set("fromDate", `${this.daysFilter.fromDate.getFullYear()}-${this.daysFilter.fromDate.getMonth() + 1}-${paginator.pageSize * (paginator.pageIndex + 1) - (paginator.pageSize - 1)}`);
					httpParams = httpParams.set("accountingType", this.daysFilter.accountingType);
					return this.daysService.getUsersDays(
						httpParams,
					).pipe(catchError(() => observableOf(null)));
				}),
				map((empData) => {
					if (empData == null) return [];
					const headers = empData.headers.get("x-pagination");
					if (headers != null) {
						//const myJson = JSON.parse(headers);
						//this.totalData = myJson.totalData
					}
					return empData.body;
				})
			)
			.subscribe((empData: any) => {
				if (empData != null) {
					this.days = empData;
					this.totalData = this.now.getDate();
					this.rows = [];
					this.rows1 = [];
					this.initiateRows(paginator.pageSize);
					this.initiateRowsData(paginator.pageSize * (paginator.pageIndex + 1) - (paginator.pageSize - 1), paginator.pageSize);
					this.checkDates(paginator.pageSize);
				}      
			});
	}

	checkDates(count: number) {
		for (let i = 0; i < count; i++){
			const rowDay = new Date(this.rows1[i].date);
			for (let j = 0; j < this.days.length; j++){
				const asd = new Date(this.days[j].date);
				if (rowDay.getDate() === asd.getDate()){
					let params = new HttpParams();
					params = params.set("date", `${rowDay.getFullYear()}-${rowDay.getMonth() + 1}-${rowDay.getDate()}`);
					// attached docs
					this.daysService.getUserDocumentsNames(this.userDetails.id, params).subscribe({
						next: res => {
							this.rows1[i].docs = res;
						}
					});
					this.rows1[i].hours = this.days[j].hours;
					this.rows1[i].id = this.days[j].id;
					this.rows1[i].status = (this.days[j].isConfirmed == true) ? "Confirmed" : "Not confirmed";
					this.rows1[i].color = (this.days[j].isConfirmed == true) ? "#1a773c" : "#da4057";
					if (this.days[j].accountingType === 1) {
						this.rows1[i].type = "Work";
					}
					else if (this.days[j].accountingType === 4) {
						this.rows1[i].type = "Vocation";
					}
					else if (this.days[j].accountingType === 3) {
						this.rows1[i].type = "Sick day";
					}
					break;
				}
				else {
					this.rows1[i].status = "No info";
					this.rows1[i].color = "#cbc327";
				}
			}
			continue;
		}
	}

	initiateRowsData(start: number, end: number){
		for (let i = 0; i < end; i++){
        
			this.rows1[i].date = `${this.now.getFullYear()}-${this.now.getMonth() + 1}-${start + i}`;
			this.rows1[i].hours = 8;
			this.rows1[i].type = "";
			this.rows1[i].color = "#cbc327";
			this.rows1[i].status = "No info";
		}
	}

	approveDay(id: string) {
		this.daysService.approveDay(id).subscribe({
			next: () =>
				console.log("ok")
		});
		window.location.reload();
	}
  
	removeDay(id: string) {
		this.daysService.removeDay(id).subscribe({
			next: () => {
				console.log("ok");
			}
		});
		window.location.reload();
	}

	initiateDayFilteringParams(userId: string, accountingType: string){
		const now = new Date();
		if (now.getDate() <= 5) {
			this.daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
			this.daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), 1);
		}
		else if (now.getDate() >= 26) {
			this.daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), 26);
			this.daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), 31);
		}
		else {
			this.daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
			this.daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
		}
		this.daysFilter.userId = userId;
		this.daysFilter.accountingType = accountingType;
	}

	getCurrentMonth() : string {
		const now = new Date();
		const months = ["January", "Febriary", "March", "April", "May", "June", "Jule", "Aughust", "September", "October", "November"];
		return months[now.getMonth()];
	}
}