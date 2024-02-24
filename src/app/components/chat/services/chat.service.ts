import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { AuthService } from "../../services/auth.service";
import { UserToChat } from "../types/userToChat.model";
import { Message } from "../types/message.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrivateChatComponent } from "../components/private-chat/private-chat.component";

@Injectable({
	providedIn: "root"
})
export class ChatService {

	constructor(private httpClient: HttpClient, private auth: AuthService, private modalService: NgbModal) {
		this.user = new UserToChat(this.auth.getEmailFromToken());
	}

	private chatConnection?: HubConnection;
	onlineUsers: string[] = [];
	messages: Message[] = [];
	privateMessages: Message[] = [];
	user: UserToChat;
	privateMessageInitiated: boolean = false;

	onInit() {
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
			this.addUserConnectionId();
		});

		this.chatConnection.on("OnlineUsers", (onlineUsers) => {
			this.onlineUsers = [...onlineUsers];
		});

		this.chatConnection.on("NewMessage", (newMessage: Message) => {
			this.messages = [...this.messages, newMessage];
		});

		this.chatConnection.on("OpenPrivateChat", (newMessage: Message) => {
			this.messages = [...this.privateMessages, newMessage];
			this.privateMessageInitiated = true;
			const modalRef = this.modalService.open(PrivateChatComponent);
			modalRef.componentInstance.toUser = newMessage.from;
		});

		this.chatConnection.on("NewPrivateMessage", (newMessage: Message) => {
			this.privateMessages = [...this.privateMessages, newMessage];
		});

		this.chatConnection.on("ClosePrivateChat", () => {
			this.privateMessageInitiated = false;
			this.privateMessages = [];
			this.modalService.dismissAll();
		});
	}

	stopChatConnection() {
		this.chatConnection?.stop().catch(error => {
			console.log(error);
		});
	}

	openPrivateChat(toUser: string) {
		debugger
		const modalRef = this.modalService.open(PrivateChatComponent);
		modalRef.componentInstance.toUser = toUser;
	}

	async closePrivateChatMessage(otherUser: string) {
		const email = this.auth.getEmailFromToken();
		return this.chatConnection?.invoke("RemovePrivateChat", email, otherUser)
			.catch(error => console.log(error));
	}

	async sendPrivateMessage(to: string, content: string) {
		const message: Message = {
			from: this.user.name,
			to,
			content
		};

		if(!this.privateMessageInitiated) {
			this.privateMessageInitiated = true;

			return this.chatConnection?.invoke("CreatePrivateChat", message).then(() => {
				this.privateMessages = [...this.privateMessages, message];
			})
				.catch(error => console.log(error));
		}
		else {
			return this.chatConnection?.invoke("ReceivePrivateMessage", message)
				.catch(error => console.log(error));
		}
	}

	async addUserConnectionId() {
		const email = this.auth.getEmailFromToken();
		return this.chatConnection?.invoke("AddUserConnectionId", email)
			.catch(error => console.log(error));
	}

	async sendMessage(content: string) {
		const message: Message = {
			from: this.user.name,
			content
		};

		return this.chatConnection?.invoke("ReceiveMessage", message)
			.catch(error => console.log(error));
	}
}
