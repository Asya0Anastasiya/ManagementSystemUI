import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "src/app/guards/auth.guard";
import { UserDocumentComponent } from "./components/user-documents/user-document.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
	{path: "profile/:id/documents", component: UserDocumentComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, NavbarModule, MatButtonModule],
	declarations: [UserDocumentComponent]
})

export class UserDocumentModule {}
