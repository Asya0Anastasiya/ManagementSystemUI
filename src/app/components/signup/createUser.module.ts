import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./components/create-user/signup.component";
import { authGuard, roleGuard } from "src/app/guards/auth.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes: Routes = [
	{path: "signup", component: SignupComponent, canActivate: [authGuard, roleGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MatButtonModule, NavbarModule],
	declarations: [SignupComponent]
})

export class SignupModule {}