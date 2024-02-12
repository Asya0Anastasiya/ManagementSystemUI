import { RouterModule, Routes } from "@angular/router";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { authGuard, roleGuard } from "src/app/guardss/auth-guard.guard";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
	{path: "employees/userDetail/:id", component: UserDetailComponent, canActivate: [authGuard, roleGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatFormFieldModule, MatSelectModule, 
		MatPaginatorModule, NavbarModule, MatButtonModule],
	declarations: [UserDetailComponent]
})

export class UserDetailModule{}