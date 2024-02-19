import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { UserDocumentComponent } from "./components/user-document/user-document.component";
import { authGuard, roleGuard } from "./guardss/auth-guard.guard";
import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from "./components/chat/chat.component";

const routes: Routes = [
	{path: "login", component: LoginComponent},
	{path: "signup", component: SignupComponent, canActivate: [authGuard, roleGuard]},
	{path: "employees", component: EmployeesComponent, canActivate: [authGuard]},
	{path: "employees/userDetail/:id", component: UserDetailComponent, canActivate: [authGuard, roleGuard]},
	{path: "profile/:id", component: UserProfileComponent, canActivate: [authGuard]},
	{path: "edit/:id", component: EditProfileComponent, canActivate: [authGuard]},
	{path: "employees/userInfo/:id", component: UserInfoComponent, canActivate: [authGuard]},
	{path: "profile/:id/documents", component: UserDocumentComponent, canActivate: [authGuard]},
	{path: "home", component: HomeComponent},
	{path: "chat", component: ChatComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
