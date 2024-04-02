import { Component, Input,  } from "@angular/core";
import { RequestMessage } from "src/app/components/requests/types/requestMessage.model";

@Component({
	selector: "messages",
	templateUrl: "./messages.component.html",
	styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent {

	@Input() messages: RequestMessage[] = [];

	constructor() {}
}
