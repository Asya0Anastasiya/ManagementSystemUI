import { Component, Input } from "@angular/core";
import { Message } from "../../types/message.model";

@Component({
	selector: "messages",
	templateUrl: "./messages.component.html",
	styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent {

  @Input() messages: Message[] = [];

  constructor() {}
}
