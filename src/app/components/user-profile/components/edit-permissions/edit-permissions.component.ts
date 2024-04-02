import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SelectRoleOptions } from "../../types/selectRoleOptions.model";
import { SelectPositionOptions } from "../../types/selectPositionOptions.model";
import { UserDetailService } from "../../services/userDetail.service";

@Component({
	selector: "app-edit-permissions",
	templateUrl: "./edit-permissions.component.html",
	styleUrls: ["./edit-permissions.component.scss"]
})
export class EditPermissionsComponent {

	constructor(public activeModal: NgbActiveModal, public userDetailService: UserDetailService) {}

	roles: SelectRoleOptions[] = [
		{value: 2, viewValue: "User"},
		{value: 3, viewValue: "DepartmentManager"}
	];

	positions: SelectPositionOptions[] = [
		{value: "6ac1ec21-6231-4c69-a508-15c1e99ff235", viewValue: ".Net Developer"},
		{value: "4ef50ea2-6259-4cda-a1be-5e14e7e3341e", viewValue: "Java Developer"},
		{value: "663e5e77-281d-4ff7-9e1c-885355539710", viewValue: "Business Analyst"},
		{value: "4841e088-2115-449b-a662-be27808f1c14", viewValue: "QA Tester"},
		{value: "194fe24f-3471-4f61-817c-e7ca4fa12353", viewValue: "Angular Developer"}
	];
}
