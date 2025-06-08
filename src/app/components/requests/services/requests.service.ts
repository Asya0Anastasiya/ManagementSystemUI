import { Injectable } from "@angular/core";
import { Request } from "../types/request.model";
import { RequestsApiService } from "../../services/requests.api.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateRequestComponent } from "../components/create-request/create-request.component";

@Injectable({
	providedIn: "root"
})
export class RequestsService {

	constructor(private requestApi: RequestsApiService, private auth: AuthService, private router: Router, private modalService: NgbModal) {
		this.id = this.auth.getIdFromToken();
	}

	requests: Request[] = [];
	id: string = "";

	getAllRequests() {
		this.requestApi.getAllRequests(this.id).subscribe({
			next: (res) => {
				this.requests = res;
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	openCreateRequestWindow() {
		this.modalService.open(CreateRequestComponent, { centered: true });
	}
}
