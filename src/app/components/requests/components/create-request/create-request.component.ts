import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/components/services/auth.service";
import { RequestsApiService } from "src/app/components/services/requests.api.service";

@Component({
	selector: "app-create-request",
	templateUrl: "./create-request.component.html",
	styleUrls: ["./create-request.component.scss"]
})
export class CreateRequestComponent implements OnInit {
	constructor(public activeModal: NgbActiveModal, private requestService: RequestsApiService, private authService: AuthService,
				private formBuilder: FormBuilder
	) {}

	adminsNames: string[] = [];
	departmentName: string = "";
	createRequestForm!: FormGroup;

	ngOnInit(): void {
		this.requestService.getAdminsNames(this.authService.getDepartmentFromToken()).subscribe({
			next: (res) => {
				this.adminsNames = res;
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	initiateForm(){
		this.createRequestForm = this.formBuilder.group({
			computerName: ["", Validators.required],
			location: ["", Validators.required],
			details: ["", Validators.required],
			receiverName: ["", Validators.required],
			producerId: [this.authService.getIdFromToken()]
		});
	}
}
