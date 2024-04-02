import { Injectable } from "@angular/core";
import { RequestsApiService } from "../../services/requests.api.service";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "../../chat/services/chat.service";
import { RequestMessage } from "../types/requestMessage.model";

@Injectable({
	providedIn: "root"
})
export class SoftwareRequestService {

	constructor(private requestApi: RequestsApiService, private auth: AuthService, private fb: FormBuilder, private chatService: ChatService) {
		this.userId = this.auth.getIdFromToken();
	}

	userId: string = "";
	requestId: string = "";
	receiverEmail: string = "";
	senderEmail: string = "";
	requestMessages: RequestMessage[] = [];
	//softwareRequest: SoftwareRequest = new SoftwareRequest("", "", "", new Date, "", "", "");
	softwareForm!: FormGroup;

	onInit(route: ActivatedRoute) {
		route.paramMap.subscribe({
			next: (params) => {
				const id = params.get("id");
				if (id) {
					this.softwareForm = this.fb.group({
						id: ["", Validators.required],
						receiver: ["", Validators.required],
						details: ["", Validators.required],
						dateTime: ["", Validators.required],
						type: ["", Validators.required],
						location: ["", Validators.required],
						computerName: ["", Validators.required]
					});
			
					this.requestApi.getSoftwareRequest(id).subscribe({
						next: (res) => {
							this.softwareForm.get("id")?.setValue(res.id);
							this.softwareForm.get("receiver")?.setValue(res.receiverName);
							this.softwareForm.get("details")?.setValue(res.details);
							this.softwareForm.get("dateTime")?.setValue(res.dateTime);
							this.softwareForm.get("type")?.setValue(res.type);
							this.softwareForm.get("location")?.setValue(res.location);
							this.softwareForm.get("computerName")?.setValue(res.computerName);
							this.requestId = res.id;
							this.receiverEmail = res.receiverEmail;
							this.senderEmail = res.producerEmail;
							this.requestMessages = res.messages;
							this.chatService.onInit(res.producerEmail, res.receiverEmail);
							this.chatService.initiateMessages(res.messages);
						},
						error: (err) => {
							console.log(err);
						}
					});
				}
			}
		});
	}
}
