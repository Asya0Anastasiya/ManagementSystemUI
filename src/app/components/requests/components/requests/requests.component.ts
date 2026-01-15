import { Component, OnInit } from "@angular/core";
import { RequestsService } from "../../services/requests.service";

@Component({
	selector: "app-requests",
	templateUrl: "./requests.component.html",
	styleUrls: ["./requests.component.scss"]
})
export class RequestsComponent implements OnInit {

	constructor(public requestsService: RequestsService) {}

	ngOnInit(): void {
		this.requestsService.getAllRequests();
	}
}
