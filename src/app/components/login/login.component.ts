import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "src/app/helpers/validateform";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "../services/user-store.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

	type: string = "password";
	isText: boolean = false;
	eyeIcon: string = "fa-eye-slash";

	loginForm!: FormGroup;

	constructor (private fb: FormBuilder, 
              private auth: AuthService, 
              private router: Router,
              private userStore: UserStoreService){}

	ngOnInit(): void { 
		this.loginForm = this.fb.group({
			email: ["", [Validators.email, Validators.required]],
			password: ["", Validators.required]
		});
	}

	hideShowPass(){
		// this.isText = !this.isText;
		// this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		// this.isText ? this.type = "text" : this.type = "password";
	}

	onLogin() {
		if(this.loginForm.valid) { 
			this.auth.login(this.loginForm.value)
				.subscribe({
					next: (res => {
						this.loginForm.reset();
						this.auth.storeToken(res.token);
						this.auth.storeRefreshToken(res.refreshToken);
						const tokenPayload = this.auth.decodeToken();
						this.userStore.setEmailForStore(tokenPayload.email);
						this.userStore.setRoleForStore(tokenPayload.role);
						this.router.navigate(["profile", tokenPayload.nameid]);
					}),
					error: (err => {
						//alert(err?.error);
					})
				});
		} else{
			ValidateForm.validateAllFormFields(this.loginForm);
		}
	}
}

