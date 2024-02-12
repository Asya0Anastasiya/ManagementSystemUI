import { Component, OnInit } from "@angular/core";
import { CreateUserService } from "../../services/createUser.service";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {

	constructor(public createUserService: CreateUserService){}

	ngOnInit(): void {
		this.createUserService.OnInit();
	}
}
