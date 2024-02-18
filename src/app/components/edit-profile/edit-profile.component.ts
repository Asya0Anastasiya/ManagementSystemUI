import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import ValidateForm from "src/app/helpers/validateform";
import { ApiService } from "../services/api.service";
import { UserStoreService } from "../services/user-store.service";
import { AuthService } from "../services/auth.service";
import { ChangePassword } from "src/app/models/changePassword.model";
import { DocumentServiceService } from "../services/document-service.service";


@Component({
	selector: "app-edit-profile",
	templateUrl: "./edit-profile.component.html",
	styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
	constructor(private fb: FormBuilder, private api: ApiService, private router: Router, 
              private userStore: UserStoreService, private auth: AuthService, private docService: DocumentServiceService) {}

	editForm!: FormGroup;
	passwordForm!: FormGroup;
	id: string = "";
	url: string = "";

	ngOnInit(): void {
		this.userStore.getIdFromStore()
			.subscribe(val => {
				const idFromToken = this.auth.getIdFromToken();
				this.id = val || idFromToken;
			});

		this.api.getUser(this.id).subscribe({
			next: (response) => {
				this.editForm.get("id")?.setValue(this.id);
				this.editForm.get("firstname")?.setValue(response.firstName);
				this.editForm.get("lastname")?.setValue(response.lastName);
				this.editForm.get("email")?.setValue(response.email);
				this.editForm.get("phoneNumber")?.setValue(response.phoneNumber);
			}
		});

		this.initiateUserImage(this.id);

		this.editForm = this.fb.group({
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			email: ["", Validators.required],
			phoneNumber: ["", Validators.required],
			id: [""]
		});

		this.passwordForm = this.fb.group({
			oldPassword: ["", Validators.required],
			newPassword: ["", Validators.required]
		});
	}

	onSubmit() {
		if(this.editForm.valid) { 
			this.api.updateUser(this.editForm.value)
				.subscribe({
					next: (() => {
						//window.location.reload();
					}),
					error: (err => {
						//alert(err?.error);
					})
				});
      
		} else{
			ValidateForm.validateAllFormFields(this.editForm);
		}

	}

	initiateUserImage(id: string){
		this.url = "../../../assets/img/catNews.jpg";
		this.api.getUserImage(id).subscribe(response => {
			const imageUrl = URL.createObjectURL(response);
			this.url = imageUrl;
		}, error => {
			console.log(error);
		});
	}

	changePassword(){
		const changePassModel: ChangePassword = {
			id: this.id,
			oldPassword: this.passwordForm.get("oldPassword")?.value,
			newPassword: this.passwordForm.get("newPassword")?.value
		};
		this.api.changePassword(changePassModel).subscribe({
			next: () => {
				window.location.reload();
			},
			error: (err => {
				//alert(err?.error);
			})
		});
		//window.location.reload();
	}

	selectedFile!: File;
  
	onImageSelected(event: any) {
		this.selectedFile = event.target.files[0];
		this.onImageUpload();
	} 

	onImageUpload() {
		const formData = new FormData();
		formData.append("file", this.selectedFile);
		this.api.setUserImage(this.id, formData).subscribe({
			next: () => {
				window.location.reload();
			}
		});
    
	}
}
