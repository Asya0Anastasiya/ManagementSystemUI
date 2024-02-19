import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { EmployeesComponent } from "./components/employees/employees.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {NgFor} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { UserDocumentComponent } from "./components/user-document/user-document.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from "./components/chat/chat.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		EmployeesComponent,
		UserDetailComponent,
		NavbarComponent,
		UserProfileComponent,
		EditProfileComponent,
		UserInfoComponent,
		UserDocumentComponent,
		HomeComponent,
		ChatComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatTooltipModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatPaginatorModule,
		MatTableModule,
		NgFor,
		MatSelectModule,
		MatExpansionModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
