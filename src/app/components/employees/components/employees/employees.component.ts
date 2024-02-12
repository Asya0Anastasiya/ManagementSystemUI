/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeesService } from "../../services/employees.service";
import { HttpParams } from "@angular/common/http";
import { ApiService } from "src/app/components/services/api.service";
import { DaysService } from "src/app/components/services/days-service.service";
import { MatPaginator } from "@angular/material/paginator";


@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.scss"]
})
export class EmployeesComponent implements OnInit {

	constructor( public employeesService: EmployeesService, private api: ApiService, private daysService: DaysService ){}

	@ViewChild("paginator") paginator!: MatPaginator;

	ngOnInit(): void {
  		this.employeesService.OnInit();
	}

	ngAfterViewInit(httpParams: HttpParams) {
		this.employeesService.AfterViewInit(httpParams, this.paginator);
	}

}
