import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./components/chat/chat.component";
import { authGuard } from "src/app/guards/auth.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";
import { ChatInputComponent } from "./components/chat-input/chat-input.component";
import { FormsModule } from "@angular/forms";
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
	{path: "chat", component: ChatComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), NavbarModule, FormsModule],
	declarations: [ChatComponent, ChatInputComponent, MessagesComponent]
})

export class ChatModule {}