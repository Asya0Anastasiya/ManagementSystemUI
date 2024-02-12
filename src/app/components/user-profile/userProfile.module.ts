import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { authGuard } from "src/app/guardss/auth-guard.guard";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes: Routes = [
	{path: "profile/:id", component: UserProfileComponent, canActivate: [authGuard]}
];

// add navbarComponent to declarations

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, MatTabsModule, FormsModule, 
		MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule, NavbarModule],
	declarations: [UserProfileComponent]
})

export class UserProfileModule{}