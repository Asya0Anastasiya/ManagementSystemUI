import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
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
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import { HomeComponent } from "./components/home/home.component";
import { LoginModule } from "./components/login/login.module";
import { EmployeesModule } from "./components/employees/employees.module";
import { UserProfileModule } from "./components/user-profile/userProfile.module";
import { EditProfileModule } from "./components/edit-profile/editProfile.module";
import { SignupModule } from "./components/signup/createUser.module";
import { UserDocumentModule } from "./components/user-document/userDocuments.module";
import { UserInfoModule } from "./components/user-info/userInfo.module";
import { NavbarModule } from "./components/shared/modules/navbar/navbar.module";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
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
		MatExpansionModule,
		LoginModule,
		EmployeesModule,
		UserProfileModule,
		EditProfileModule,
		SignupModule,
		UserDocumentModule,
		UserInfoModule,
		NavbarModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
