/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Employee } from "src/app/models/employee.model";
import { DaysService } from "../services/days-service.service";
import { DaysFiltering } from "src/app/models/daysFiltering.model";
import { HttpParams } from "@angular/common/http";
import { DaysAccounting } from "src/app/models/daysAccounting.model";
import { DomSanitizer } from "@angular/platform-browser";
import { of as observableOf } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { catchError, map, startWith, switchMap } from "rxjs";
import { RowData } from "src/app/models/rowData.model";
import { DocumentServiceService } from "../services/document-service.service";
import { RowWithDocs } from "src/app/models/rowWithDocs.model";


@Component({
	selector: "app-user-detail",
	templateUrl: "./user-detail.component.html",
	styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {

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
  @ViewChild("paginator") paginator!: MatPaginator;
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
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private daysService: DaysService, private sanitizer: DomSanitizer, private docService: DocumentServiceService){}

  ngOnInit(): void {
  	this.month = this.getCurrentMonth();
  	this.route.paramMap.subscribe({
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
  				this.initiateUserImage(id);
  			}
  		}
  	});
  }

  ngAfterViewInit() {
  	this.paginator.page
  		.pipe(
  			startWith({}),
  			switchMap(() => {
  				this.route.paramMap.subscribe({
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
  				httpParams = httpParams.set("tillDate", `${this.daysFilter.tillDate.getFullYear()}-${this.daysFilter.tillDate.getMonth() + 1}-${this.paginator.pageSize * (this.paginator.pageIndex + 1)}`);
  				httpParams = httpParams.set("fromDate", `${this.daysFilter.fromDate.getFullYear()}-${this.daysFilter.fromDate.getMonth() + 1}-${this.paginator.pageSize * (this.paginator.pageIndex + 1) - (this.paginator.pageSize - 1)}`);
  				httpParams = httpParams.set("accountingType", this.daysFilter.accountingType);
  				return this.daysService.getUsersDays(
  					httpParams,
  					this.paginator.pageIndex + 1, this.paginator.pageSize
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
  				this.initiateRows(this.paginator.pageSize);
  				this.initiateRowsData(this.paginator.pageSize * (this.paginator.pageIndex + 1) - (this.paginator.pageSize - 1), this.paginator.pageSize);
  				this.checkDates(this.paginator.pageSize);
  			}      
  		});
  }

  downloadDocument(name: string) {
  	const ext = name.split(".");
  	this.docService.downloadUserDocument(name, this.userDetails.id).subscribe(response => {
  		const url = window.URL.createObjectURL(new Blob([response]));
  		const link = document.createElement("a");
  		link.href = url;
  		link.setAttribute("download", ext[0] + "." + ext[1]);
  		document.body.appendChild(link);
  		link.click();
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

  getCurrentMonth() : string {
  	const now = new Date();
  	const months = ["January", "Febriary", "March", "April", "May", "June", "Jule", "Aughust", "September", "October", "November"];
  	return months[now.getMonth()];
  }

  setParams(httpParams: HttpParams){
  	httpParams = httpParams.set("userId", this.daysFilter.userId);
  	httpParams = httpParams.set("fromDate", `${this.daysFilter.fromDate}`);
  	httpParams = httpParams.set("tillDate", `${this.daysFilter.tillDate}`);
  	httpParams = httpParams.set("accountingType", this.daysFilter.accountingType);
  	return httpParams;
  }

  initiateUserImage(id: string){
  	this.url = "../../../assets/img/catNews.jpg";
  	this.api.getUserImage(id).subscribe(response => {
  		const imageUrl = URL.createObjectURL(response);
  		this.url = imageUrl;
  	}, error => {
  		console.log(error);
  	});
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

  deleteUser(id: string){
  	this.api.deleteUser(id)
  		.subscribe({
  			next: () => {
  				this.router.navigate(["employees"]);
  			}
  		});
  }

  selectedFile!: File;
  
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
}
