/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { UserDetailService } from "../../services/userDetail.service";
import { ActivatedRoute } from "@angular/router";


@Component({
	selector: "app-user-detail",
	templateUrl: "./user-detail.component.html",
	styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {

  @ViewChild("paginator") paginator!: MatPaginator;

  constructor(public userDetailService: UserDetailService, private route: ActivatedRoute){}

  ngOnInit(): void { 
  	this.userDetailService.OnInit(this.route);
  }

  ngAfterViewInit() {
  	this.userDetailService.AfterViewInit(this.paginator, this.route);
  }
}
