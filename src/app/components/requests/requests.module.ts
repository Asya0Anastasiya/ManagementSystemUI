import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "src/app/guards/auth.guard";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RequestsComponent } from "./components/requests/requests.component";
import { SoftwareRequestComponent } from "./components/software-request/software-request.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ChatModule } from "../chat/chat.module";

const routes: Routes = [
	{ path: "requests/:id", component: RequestsComponent, canActivate: [authGuard] },
	{ path: "requests/:userId/request/:id", component: SoftwareRequestComponent, canActivate: [authGuard] }
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, NavbarModule, ReactiveFormsModule, ChatModule],
	declarations: [RequestsComponent, SoftwareRequestComponent]
})

export class RequestsModule {}