import { Component, OnInit } from "@angular/core";
import { UserInfoService } from "../../services/userInfo.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-user-info",
	templateUrl: "./user-info.component.html",
	styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent implements OnInit {

	constructor(public userInfoService: UserInfoService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.userInfoService.OnInit(this.route);
	}
}
