import { Component, OnDestroy, OnInit } from "@angular/core";
import { SoftwareRequestService } from "../../services/software-request.service";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "src/app/components/chat/services/chat.service";

@Component({
	selector: "app-software-request",
	templateUrl: "./software-request.component.html",
	styleUrls: ["./software-request.component.scss"]
})
export class SoftwareRequestComponent implements OnInit, OnDestroy {

	constructor(public softwareRequestService: SoftwareRequestService, private route: ActivatedRoute, private chatService: ChatService) {}
  
	ngOnInit(): void {
		this.softwareRequestService.onInit(this.route);
		//const email = this.softwareRequestService.otherEmail;
		//debugger
		//this.chatService.onInit(email);
	}

	ngOnDestroy(): void {
		this.chatService.stopChatConnection();
	}
}
