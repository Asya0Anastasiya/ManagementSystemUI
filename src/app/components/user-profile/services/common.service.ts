import { Injectable } from "@angular/core";
import { DaysFiltering } from "../../shared/types/daysFiltering.model";
import { RowData } from "../../shared/types/rowData.model";
import { ApiService } from "../../services/api.service";
import { DaysService } from "../../services/days-service.service";
import { Employee } from "../../shared/types/employee.model";

@Injectable({
	providedIn: "root"
})

export class CommonService {
	constructor(private api: ApiService, private daysService: DaysService) {}

	getCurrentMonth() : string {
		const now = new Date();
		const months = ["January", "Febriary", "March", "April", "May", "June", "Jule", "Aughust", "September", "October", "November"];
		return months[now.getMonth()];
	}

	initiateDayFilteringParams(userId: string, accountingType: string, daysFilter: DaysFiltering) : DaysFiltering {
		const now = new Date();
		if (now.getDate() <= 5) {
			daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
			daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), 1);
		}
		else if (now.getDate() >= 26) {
			daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), 26);
			daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), 31);
		}
		else {
			daysFilter.fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
			daysFilter.tillDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
		}
		daysFilter.userId = userId;
		daysFilter.accountingType = accountingType;

		return daysFilter;
	}

	initiateRowsData(start: number, end: number, rows: RowData[]) : RowData[] {
		const now = new Date();
		for (let i = 0; i < end; i++) {  
			rows[i].date = `${now.getFullYear()}-${now.getMonth() + 1}-${start + i}`;
			rows[i].hours = 8;
			rows[i].type = "";
			rows[i].color = "#cbc327";
			rows[i].status = "No info";
		}
		return rows;
	}

	initiateRows(count:number, rows: RowData[]) : RowData[] {
		for (let i = 1; i <= count; i++) {
			const row: RowData = {
				date: "",
				hours: 0,
				type: "",
				status: "",
				color: "",
				id: ""
			};
			rows.push(row);
		}
		return rows;
	}

	fullfillUserInfo(userDetails: Employee, id: string) : Employee {
		const now = new Date();
		this.api.getUser(id).subscribe({
			next: (response) => {
				userDetails.id = response.id;
				userDetails.firstName = response.firstName;
				userDetails.lastName = response.lastName;
				userDetails.email = response.email;
			}
		});
		this.daysService.getUsersDaysInfo(id, now.getMonth() + 1, now.getFullYear()).subscribe({
			next: (res) => {
				userDetails.workDays = res.workDaysCount;
				userDetails.sickDays = res.sickDaysCount;
				userDetails.holidays = res.holidaysCount;
				userDetails.paidDays = res.paidDaysCount;
			}
		});
		return userDetails;
	}
}