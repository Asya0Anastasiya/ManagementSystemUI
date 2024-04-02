import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { AuthService } from "../../services/auth.service";
import { UserToChat } from "../types/userToChat.model";
import { Message } from "../types/message.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrivateChatComponent } from "../components/private-chat/private-chat.component";
import { RequestMessage } from "../../requests/types/requestMessage.model";
import { NewRequestMessage } from "../types/newRequestMessage.model";

@Injectable({
	providedIn: "root"
})
export class ChatService {

	constructor(private httpClient: HttpClient, private auth: AuthService, private modalService: NgbModal) {
		this.user = new UserToChat(this.auth.getEmailFromToken());
	}

	producerEmail: string ="";
	receiverEmail: string = "";

	private chatConnection?: HubConnection;
	onlineUsers: string[] = [];
	privateMessages: RequestMessage[] = [];
	user: UserToChat;

	onInit(producerEmail: string, receiverEmail: string) {
		this.producerEmail = producerEmail;
		this.receiverEmail = receiverEmail;
		this.user = new UserToChat(this.auth.getEmailFromToken());
		this.registerUser(this.user).subscribe({
			next: () => {
				console.log("open chat");
			},
			error: (err => {
				alert(err?.error);
			})
		});
		this.createChatConnection();
	}

	registerUser(user: UserToChat) {
		return this.httpClient.post("https://localhost:44307/api/chat/register-user", user, {responseType: "text"});
	}

	createChatConnection() {
		this.chatConnection = new HubConnectionBuilder()
			.withUrl("https://localhost:44307/hubs/chat").withAutomaticReconnect().build();

		this.chatConnection.start().catch(error => {
			console.log(error);
		});

		this.chatConnection.on("UserConnected", () => {
			this.addUserConnectionId(this.producerEmail, this.receiverEmail);
		});

		this.chatConnection.on("OnlineUsers", (onlineUsers) => {
			this.onlineUsers = [...onlineUsers];
		});

		this.chatConnection.on("OpenPrivateChat", (newMessage: RequestMessage) => {
			this.privateMessages = [...this.privateMessages, newMessage];

		});

		this.chatConnection.on("NewPrivateMessage", (newMessage: RequestMessage) => {
			this.privateMessages = [...this.privateMessages, newMessage];
		});

		this.chatConnection.on("ClosePrivateChat", () => {
			this.modalService.dismissAll();
		});
	}

	stopChatConnection() {
		this.chatConnection?.stop().catch(error => {
			console.log(error);
		});
	}

	initiateMessages(messages: RequestMessage[]) {
		this.privateMessages = messages;
	}

	openPrivateChat(toUser: string) {
		const modalRef = this.modalService.open(PrivateChatComponent);
		modalRef.componentInstance.toUser = toUser;
	}

	async closePrivateChatMessage(otherUser: string) {
		const email = this.auth.getEmailFromToken();
		return this.chatConnection?.invoke("RemovePrivateChat", email, otherUser)
			.catch(error => console.log(error));
	}

	async sendPrivateMessage(sender: string, receiver: string, content: string, requestId: string) {
		let message: NewRequestMessage;
		if(sender == this.user.email) {
			message = new NewRequestMessage(sender, receiver, content, requestId);
		} else {
			message = new NewRequestMessage(receiver, sender, content, requestId);
		}
		

		return this.chatConnection?.invoke("ReceivePrivateMessage", message)
			.catch(error => console.log(error));
	}

	async addUserConnectionId(producerEmail: string, receiverEmail: string) {
		return this.chatConnection?.invoke("AddUserConnectionId", producerEmail, receiverEmail)
			.catch(error => console.log(error));
	}

	async sendMessage(content: string) {
		const message: Message = {
			from: this.user.email,
			content
		};

		return this.chatConnection?.invoke("ReceiveMessage", message)
			.catch(error => {console.log(error);
			});
	}
}
