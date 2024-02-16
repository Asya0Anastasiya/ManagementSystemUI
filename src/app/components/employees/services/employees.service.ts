/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "../../shared/types/employee.model";
import { ApiService } from "../../services/api.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { HttpParams } from "@angular/common/http";
import { catchError, map, startWith, switchMap, of as observableOf } from "rxjs";
import { DaysService } from "../../services/days-service.service";
import { UserStoreService } from "../../services/user-store.service";
import { AuthService } from "../../services/auth.service";
import { ImageService } from "../../shared/services/image.service";

@Injectable({
	providedIn: "root"
})

export class EmployeesService {
	constructor(private router: Router, private api: ApiService, private daysService: DaysService,
		private userStore: UserStoreService, private auth: AuthService, private fb: FormBuilder,
		private imageService: ImageService) {}

	public users: Employee[] = [];
	public url: string = "";
	public id: string = "";
	public role: string = "";
	totalData!: number;
	searchForm!: FormGroup;

	createEmployee() {
  	this.router.navigate(["signup"]);
	}

	AfterViewInit(httpParams: HttpParams, paginator: MatPaginator) {
  	paginator.page
  		.pipe(
  			startWith({}),
  			switchMap(() => {
  				return this.api.getUsers(httpParams,
  					paginator.pageIndex + 1, paginator.pageSize
  				).pipe(catchError(() => observableOf(null)));
  			}),
  			map((empData) => {
  				if (empData == null) return [];
  				return empData.body;
  			})
  		)
  		.subscribe((empData: any) => {
  			if (empData != null) {
  				this.users = empData.userInfoModels;
  			}   
  			for ( let i = 0; i < this.users.length; i++) {
  				this.daysService.getUnconfirmedDaysCount(this.users[i].id).subscribe({
  					next: res => {
  						this.users[i].unConfirmedDaysCount = res;
  					}
  				});
  			}   
  			this.imageService.initiateUsersImages(this.users, this.api);
  		});
	}

	OnInit(): void {

  	this.searchForm = this.fb.group({
  		firstname: [""],
  		lastname: [""],
  		email: [""]
  	});

  	this.userStore.getIdFromStore()
  		.subscribe(val => {
  			const idFromToken = this.auth.getIdFromToken();
  			this.id = val || idFromToken;
  		});
		
  	this.userStore.getRoleFromStore()
  		.subscribe(val => {
  			const roleFromToken = this.auth.getRoleFromToken();
  			this.role = val || roleFromToken;
  		});
	}

	onSearch(paginator: MatPaginator){
  	let httpParams = new HttpParams();
	
  	httpParams = httpParams.set("firstname", this.searchForm.get("firstname")?.value);
  	httpParams = httpParams.set("lastname", this.searchForm.get("lastname")?.value);
  	httpParams = httpParams.set("email", this.searchForm.get("email")?.value);  
	     
  	this.AfterViewInit(httpParams, paginator);
	}

	clear(paginator: MatPaginator) {
  	const httpParams = new HttpParams();
  	this.AfterViewInit(httpParams, paginator);
  	this.searchForm.reset();
	}
}
