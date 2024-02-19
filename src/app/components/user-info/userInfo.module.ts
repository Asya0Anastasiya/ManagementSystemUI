import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { authGuard } from "src/app/guards/auth.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes: Routes = [
	{path: "employees/userInfo/:id", component: UserInfoComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, NavbarModule],
	declarations: [UserInfoComponent]
})

export class UserInfoModule {}