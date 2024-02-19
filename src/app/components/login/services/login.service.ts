import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import ValidateForm from "src/app/helpers/validateform";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "../../services/user-store.service";

@Injectable({
	providedIn: "root"
})

export class LoginService {

	constructor(private auth: AuthService, 
        private router: Router,
        private userStore: UserStoreService,
		private fb: FormBuilder) {}

	type: string = "password";
	isText: boolean = false;
	eyeIcon: string = "fa-eye-slash";
	public loginForm!: FormGroup;

	hideShowPass(){
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password";
	}

	initiateForm(){
		this.loginForm = this.fb.group({
			email: ["", [Validators.email, Validators.required]],
			password: ["", Validators.required]
		});
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
						alert(err?.error);
					})
				});
		} else{
			ValidateForm.validateAllFormFields(this.loginForm);
		}
	}
}
