import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Employee } from "../../shared/types/employee.model";
import { ImageService } from "../../shared/services/image.service";
import { ActivatedRoute } from "@angular/router";

@Injectable({
	providedIn: "root"
})

export class UserInfoService {

	constructor(private fb: FormBuilder, private api: ApiService,
        private imageService: ImageService) {}

	public url: string = "";

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

	personalForm!: FormGroup;
	positionForm!: FormGroup;

	OnInit(route: ActivatedRoute): void {
		route.paramMap.subscribe({
			next: (params) => {
				const id = params.get("id");
				if (id) {
					this.api.getUser(id).subscribe({
						next: (response) => {
							this.userDetails.id = response.id;
							this.userDetails.firstName = response.firstName;
							this.userDetails.lastName = response.lastName;
							this.userDetails.email = response.email;
							this.userDetails.department = response.department;
							this.userDetails.position = response.position;
							this.userDetails.branchOffice = response.branchOffice;

							this.personalForm.get("firstname")?.setValue(this.userDetails.firstName);
							this.personalForm.get("lastname")?.setValue(this.userDetails.lastName);
							this.personalForm.get("email")?.setValue(this.userDetails.email);
							this.personalForm.get("phoneNumber")?.setValue(this.userDetails.phoneNumber);

							this.positionForm.get("position")?.setValue(this.userDetails.position);
							this.positionForm.get("department")?.setValue(this.userDetails.department);
							this.positionForm.get("branchOffice")?.setValue(this.userDetails.branchOffice);
						}
					});
      
					this.url = this.imageService.initiateUserImage(id, this.api);

					this.personalForm = this.fb.group({
						firstname: [""],
						lastname: [""],
						email: [""],
						phoneNumber: [""]
					});

					this.positionForm = this.fb.group({
						position: [""],
						department: [""],
						branchOffice: [""],
						Address: [""]
					});
				}
			}
		});
	}
}