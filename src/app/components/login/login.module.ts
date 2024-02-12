import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
	{path: "login", component: LoginComponent}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MatButtonModule],
	declarations: [LoginComponent]
})

export class LoginModule {}