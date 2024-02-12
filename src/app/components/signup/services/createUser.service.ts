import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import ValidateForm from "src/app/helpers/validateform";

@Injectable({
	providedIn: "root"
})

export class CreateUserService {

	constructor(private fb: FormBuilder, private auth: AuthService) {}

	type: string = "password";
	isText: boolean = false;
	eyeIcon: string = "fa-eye-slash"; 
	signUpForm!: FormGroup;

	OnInit(): void {
		this.signUpForm = this.fb.group({
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			email: ["", [Validators.email, Validators.required]],
			password: ["", Validators.required],
			positionId: ["", Validators.required],
			phoneNumber: ["", Validators.required]
		});
	}

	onSignUp() {
		if(this.signUpForm.valid) { 
			this.auth.signUp(this.signUpForm.value)
				.subscribe({
					next: (() => {
						alert("User was successfully added");
						this.signUpForm.reset();
						//this.router.navigate(['login']);
					}),
					error: (err => {
						alert(err?.error);
					})
				});
			console.log(this.signUpForm.value);
		} else{
			ValidateForm.validateAllFormFields(this.signUpForm);
		}
	}

	hideShowPass(){
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password";
	}

	resetForm(){
		this.signUpForm.reset();
	}
}