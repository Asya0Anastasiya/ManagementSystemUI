import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { AuthService } from "../../services/auth.service";
import { UserToChat } from "../types/userToChat.model";
import { Message } from "../types/message.model";

@Injectable({
	providedIn: "root"
})
export class ChatService {

	constructor(private httpClient: HttpClient, private auth: AuthService) {
		//debugger
		this.user = new UserToChat(this.auth.getEmailFromToken());
	}

	private chatConnection?: HubConnection;
	onlineUsers: string[] = [];
	messages: Message[] = [];
	user: UserToChat;

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
	}

	stopChatConnection() {
		this.chatConnection?.stop().catch(error => {
			console.log(error);
		});
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
