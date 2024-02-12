import { Component, OnInit } from "@angular/core";
import { EditProfileService } from "../../services/editProfile.service";


@Component({
	selector: "app-edit-profile",
	templateUrl: "./edit-profile.component.html",
	styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
	constructor(public editProfileService: EditProfileService) {}

	ngOnInit(): void {
		this.editProfileService.onInit();
	}
}
