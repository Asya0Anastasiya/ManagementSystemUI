import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { UserStoreService } from "../../services/user-store.service";
import { AuthService } from "../../services/auth.service";
import { ImageService } from "../../shared/services/image.service";
import ValidateForm from "src/app/helpers/validateform";
import { ChangePassword } from "../types/changePassword.model";

@Injectable({
	providedIn: "root"
})

export class EditProfileService {

	constructor(private fb: FormBuilder, private api: ApiService, private imageService: ImageService,
        private userStore: UserStoreService, private auth: AuthService) {}

	editForm!: FormGroup;
	passwordForm!: FormGroup;
	selectedFile!: File;
	id: string = "";
	url: string = "";

	onInit() {
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

		this.imageService.initiateUserImage(this.id, this.api);

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
						window.location.reload();
					}),
					error: (err => {
						alert(err?.error);
					})
				});
      
		} else{
			ValidateForm.validateAllFormFields(this.editForm);
		}
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
			}
		});
		window.location.reload();
	}

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