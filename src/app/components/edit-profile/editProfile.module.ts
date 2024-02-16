import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { authGuard } from "src/app/guards/auth.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes: Routes = [
	{path: "edit/:id", component: EditProfileComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, NavbarModule],
	//add NavbarComponent to declarations
	declarations: [EditProfileComponent]
})

export class EditProfileModule {}