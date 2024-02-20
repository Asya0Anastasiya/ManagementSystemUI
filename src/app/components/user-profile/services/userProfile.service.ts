import { Injectable } from "@angular/core";
import { ImageService } from "../../shared/services/image.service";
import { Employee } from "../../shared/types/employee.model";
import { UserStoreService } from "../../services/user-store.service";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { DaysService } from "../../services/days-service.service";
import { DocumentInfo } from "src/app/components/user-profile/types/documentInfo.model";
import { SelectDocument } from "src/app/components/user-profile/types/selectDocumentOptions.model";
import { DocumentServiceService } from "../../services/document-service.service";
import { DaysFiltering } from "src/app/components/shared/types/daysFiltering.model";
import { DaysAccounting } from "src/app/components/shared/types/daysAccounting.model";
import { RowData } from "src/app/components/shared/types/rowData.model";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { HttpParams } from "@angular/common/http";
import { catchError, map, startWith, switchMap, of as observableOf } from "rxjs";
import { SelectMonthOptions } from "src/app/components/user-profile/types/selectOptions.model";
import { CommonService } from "./common.service";

@Injectable({
	providedIn: "root"
})

export class UserProfileService {
	constructor(private imageService: ImageService, private userStore: UserStoreService, private api: ApiService,
        private auth: AuthService, private daysService: DaysService, private docService: DocumentServiceService,
		private commonService: CommonService){}

	now: Date = new Date;
	month: string = "";
	start: number = 0;
	public id: string = "";
	public url: string = "";
	sickDayForm!: FormGroup;
	vocationsForm!: FormGroup;
	docs: SelectDocument[] = [];
	public totalData: number = 7;
	public daysArray: DaysAccounting[] = [];
	public days: DaysAccounting[] = [];
	rows: RowData[] = [];

	userDetails: Employee = {
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		position: "",
		role: "",
		branchOffice: "",
		unConfirmedDaysCount: 0,
		phoneNumber: "",
		workDays: 0,
		sickDays: 0,
		holidays: 0,
		paidDays: 0,
		url: ""
	};

	months: SelectMonthOptions[] = [
		{value: 1, viewValue: "January"},
		{value: 2, viewValue: "February"},
		{value: 3, viewValue: "March"},
		{value: 4, viewValue: "April"},
		{value: 5, viewValue: "May"},
		{value: 6, viewValue: "June"},
		{value: 7, viewValue: "July"},
		{value: 8, viewValue: "Aughust"},
		{value: 9, viewValue: "September"},
		{value: 10, viewValue: "October"},
		{value: 11, viewValue: "November"},
		{value: 12, viewValue: "December"}
	];

	daysFilter: DaysFiltering = {
		userId: "",
		fromDate: new Date,
		tillDate: new Date,
		accountingType: ""
	};

	dayAccounting: DaysAccounting = {
		hours: 0,
		date: new Date(),
		accountingType: 0,
		userId: "",
		id: "",
		isConfirmed: false
	};

	row: RowData = {
		date: "",
		hours: 0,
		type: "",
		status: "",
		color: "",
		id: ""
	};

	OnInit(): void {
    
		this.month = this.commonService.getCurrentMonth();
		this.userStore.getIdFromStore()
			.subscribe(val => {
				const idFromToken = this.auth.getIdFromToken();
				this.id = val || idFromToken;
			});
		this.userDetails = this.commonService.fullfillUserInfo(this.userDetails, this.id);
  
		this.url = this.imageService.initiateUserImage(this.id, this.api);
		this.daysFilter = this.commonService.initiateDayFilteringParams(this.id, "", this.daysFilter);
		this.docService.getUserDocumentsNames(this.id).subscribe((res: DocumentInfo[]) => {
			for (let i = 0; i < res.length; i++) {
				const doc: SelectDocument = {
					value: res[i].id,
					viewValue: res[i].name
				};
				this.docs.push(doc);
			}
		});
	}

	initiateForms(){
		this.sickDayForm = new FormGroup({
			start: new FormControl(),
			end: new FormControl(),
			userId: new FormControl()
		});
		this.vocationsForm = new FormGroup({
			start: new FormControl(),
			end: new FormControl(),
			userId: new FormControl()
		});
	}

	attachDocument(documentId: string, dateStr: string) {
		const date = new Date(dateStr);
		date.setHours(5);
		this.docService.attachDocument(this.id, date, documentId).subscribe({
			next: () => {
				window.location.reload();
			}
		});
	}

	checkDates(count: number) {
		for (let i = 0; i < count; i++){
			const rowDay = new Date(this.rows[i].date);
			for (let j = 0; j < this.days.length; j++) {
				const asd = new Date(this.days[j].date);
				if (rowDay.getDate() === asd.getDate()) {
					this.rows[i].hours = this.days[j].hours;
					this.rows[i].status = (this.days[j].isConfirmed == true) ? "Confirmed" : "Not confirmed";
					this.rows[i].color = (this.days[j].isConfirmed == true) ? "#1a773c" : "#da4057";
            
					if (this.days[j].accountingType === 1) {
						this.rows[i].type = "Work";
					}
					else if (this.days[j].accountingType === 4) {
						this.rows[i].type = "Vocation";
					}
					else if (this.days[j].accountingType === 3) {
						this.rows[i].type = "Sick day";
					}
					break;
				}
				else {
					this.rows[i].status = "No info";
					this.rows[i].color = "#cbc327";
				}
			}
			continue;
		}
	}

	onSubmit() {
		if (this.daysArray.length != 0) {
			this.daysService.postDays(this.daysArray).subscribe({
				next: (res) => {
					console.log(res);
					window.location.reload();
				},
				error: (err => {
					alert(err?.error);
				})
			});
			this.daysArray = [];
		}
		else {
			alert("You should choose at least 1 day to submit");
		}
	}

	selectionChange(event: any, paginator: MatPaginator) {
		if (event.isUserInput) {
			this.now.setMonth(event.source.value - 1);
			this.defineIndex();
			this.daysFilter = this.commonService.initiateDayFilteringParams(this.id, "", this.daysFilter);
			this.AfterViewInit(paginator);
		}    
	}
  
	initiateRows(count:number) {
		for (let i = 1; i <= count; i++) {
			const row: RowData = {
				date: "",
				hours: 0,
				type: "",
				status: "",
				color: "",
				id: ""
			};
			this.rows.push(row);
		}
	}

	postSickDays() {
		const start = new Date(this.sickDayForm.get("start")?.value);
		start.setHours(5);
		const end = new Date(this.sickDayForm.get("end")?.value);
		end.setHours(5);
		while (start <= end ) {
			const dateSt = new Date(start);
			const day: DaysAccounting = {
				hours: 8,
				date: dateSt,
				accountingType: 3,
				userId: this.id,
				id: "",
				isConfirmed: true
			};
			this.daysArray.push(day);
			start.setDate(start.getDate() + 1);
		}
		this.daysService.postDays(this.daysArray).subscribe({
			next: () => {
				window.location.reload();
			},
			error:  (err => {
				alert(err?.error);
			})
		});
		this.daysArray = [];
	}

	postVocations() {
		const start = new Date(this.vocationsForm.get("start")?.value);
		start.setHours(5);
		const end = new Date(this.vocationsForm.get("end")?.value);
		end.setHours(5);
		while (start <= end ) {
			const dateSt = new Date(start);
			const day: DaysAccounting = {
				hours: 8,
				date: dateSt,
				accountingType: 4,
				userId: this.id,
				id: "",
				isConfirmed: false
			};
			this.daysArray.push(day);
			start.setDate(start.getDate() + 1);
		}
		this.daysService.postDays(this.daysArray).subscribe({
			next: () => {
				window.location.reload();
			},
			error:  (err => {
				alert(err?.error);
			})
		});
		this.daysArray = [];
	}
  
	onCheckboxChange(e: any, i: number) {
      
		const day: DaysAccounting = {
			hours: this.rows[i].hours,
			date: new Date(this.rows[i].date),
			accountingType: 1,
			userId: this.id,
			id: "",
			isConfirmed: false
		};
		day.date.setHours(5);
		if (e.target.checked == true) {
			this.daysArray.push(day);
		}
		else {
			this.daysArray.pop();
		}
	}

	defineIndex() {
		if ([0, 2, 4, 6, 7, 9, 11].includes(this.now.getMonth())) {
			this.totalData = 31;
		}
		else if ([3, 5, 8, 10].includes(this.now.getMonth())) {
			this.totalData = 30;
		}
		else {
			this.totalData = 29;
		}
	}

	AfterViewInit(paginator: MatPaginator) {
		paginator.page
			.pipe(
				startWith({}),
				switchMap(() => {
					let httpParams = new HttpParams();
					httpParams = httpParams.set("userId", this.daysFilter.userId);
					this.start = paginator.pageSize * (paginator.pageIndex + 1) - (paginator.pageSize - 1);
					if (this.start > 26) {
						this.defineIndex();
						httpParams = httpParams.set("tillDate", `${this.daysFilter.tillDate.getFullYear()}-${this.daysFilter.tillDate.getMonth() + 1}-${this.totalData}`);
					}
					else {
						httpParams = httpParams.set("tillDate", `${this.daysFilter.tillDate.getFullYear()}-${this.daysFilter.tillDate.getMonth() + 1}-${paginator.pageSize * (paginator.pageIndex + 1)}`);
					}
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
					const currentMonth = new Date().getMonth();
					if (this.now.getMonth() == currentMonth) {
						this.totalData = this.now.getDate();
					}
          
					this.rows = [];
					if (this.start > 26) {
						this.initiateRows(this.totalData % paginator.pageSize);
						this.rows = this.commonService.initiateRowsData(this.start, this.totalData % paginator.pageSize, this.rows);
						this.checkDates(this.totalData % paginator.pageSize);
					}
					else {
						this.initiateRows(paginator.pageSize);
						this.rows = this.commonService.initiateRowsData(paginator.pageSize * (paginator.pageIndex + 1) - (paginator.pageSize - 1), paginator.pageSize, this.rows);
						this.checkDates(paginator.pageSize);
					}       
				}      
			});
	}
}

