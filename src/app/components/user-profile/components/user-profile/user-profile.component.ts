/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { UserProfileService } from "../../services/userProfile.service";


@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {

	constructor(public userProfileService: UserProfileService){
		this.userProfileService.initiateForms();
	} 

  @ViewChild("paginator") paginator!: MatPaginator;

  ngOnInit(): void {
  	this.userProfileService.OnInit();
  }

  ngAfterViewInit() {
  	this.userProfileService.AfterViewInit(this.paginator);
  }
}
