import { Component, OnInit } from "@angular/core";
import { UserDocumentsService } from "../../services/userDocuments.service";

@Component({
	selector: "app-user-document",
	templateUrl: "./user-document.component.html",
	styleUrls: ["./user-document.component.scss"]
})
export class UserDocumentComponent implements OnInit {

	constructor(public userDocsService: UserDocumentsService) { }

	ngOnInit(): void {
		this.userDocsService.OnInit();
	}
}
