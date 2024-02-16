import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./components/employees/employees.component";
import { authGuard } from "src/app/guards/auth.guard";
import { MatExpansionModule } from "@angular/material/expansion";
import { ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes: Routes = [
	{path: "employees", component: EmployeesComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatExpansionModule, ReactiveFormsModule, 
		MatBadgeModule, MatPaginatorModule, MatButtonModule, NavbarModule],
	//add NavbarComponent to declarations
	declarations: [EmployeesComponent]
})

export class EmployeesModule {}