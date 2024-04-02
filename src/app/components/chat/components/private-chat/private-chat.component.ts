/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, Input, OnInit } from "@angular/core";
//import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ChatService } from "../../services/chat.service";
import { OnDestroy } from "@angular/core";
import { RequestMessage } from "src/app/components/requests/types/requestMessage.model";

@Component({
	selector: "app-private-chat",
	templateUrl: "./private-chat.component.html",
	styleUrls: ["./private-chat.component.scss"]
})
export class PrivateChatComponent implements OnInit, OnDestroy {

  @Input() requestId: string = "";
  @Input() receiverEmail: string = "";
  @Input() senderEmail: string = "";
  @Input() requestMessages: RequestMessage[] = [];

  constructor( public chatService: ChatService) {}
  ngOnInit(): void {  }
  
  ngOnDestroy(): void {
  	//this.chatService.closePrivateChatMessage(this.toUser);
  	// send messages to the server
  }

  sendMessage(content: string) {
  	this.chatService.sendPrivateMessage(this.senderEmail, this.receiverEmail, content, this.requestId);
  }
}
