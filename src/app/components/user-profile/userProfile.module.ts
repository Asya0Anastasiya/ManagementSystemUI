import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { authGuard, roleGuard } from "src/app/guards/auth.guard";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";

const routes: Routes = [
	{path: "profile/:id", component: UserProfileComponent, canActivate: [authGuard]},
	{path: "employees/userDetail/:id", component: UserDetailComponent, canActivate: [authGuard, roleGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, MatTabsModule, FormsModule, 
		MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule, NavbarModule],
	declarations: [UserProfileComponent, UserDetailComponent]
})

export class UserProfileModule{}