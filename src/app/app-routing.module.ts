import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeesComponent } from './components/employees/employees.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/userDetail/:id', component: UserDetailComponent},
  {path: 'profile/:id', component: UserProfileComponent},
  {path: 'edit/:id', component: EditProfileComponent},
  {path: 'employees/userInfo/:id', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
