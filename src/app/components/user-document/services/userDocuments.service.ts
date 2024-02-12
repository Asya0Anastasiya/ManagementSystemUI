import { Injectable } from "@angular/core";
import { UserStoreService } from "../../services/user-store.service";
import { AuthService } from "../../services/auth.service";
import { DocumentServiceService } from "../../services/document-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDocument } from "src/app/models/document.model";

@Injectable({
	providedIn: "root"
})

export class UserDocumentsService {

	constructor(private userStore: UserStoreService, private auth: AuthService, private docService: DocumentServiceService,
              private fb: FormBuilder) {}

	id: string = "";
	a: string = "";
	selectedDoc!: any;
	public documents: UserDocument[] = [];
	uploadForm!: FormGroup;

	OnInit(): void {
		this.userStore.getIdFromStore()
			.subscribe(val => {
				const idFromToken = this.auth.getIdFromToken();
				this.id = val || idFromToken;
			});
        
		this.getUserDocuments();
        
		this.uploadForm = this.fb.group({
			uploadFile: FormData,
			type: ["", Validators.required]
		});
	}

	onDocumentSelected(event: any) {
		this.selectedDoc = event.target.files[0];
		this.uploadForm.get("uploadFile")?.setValue(this.selectedDoc);
	}

	onSubmitForm() {
		const formData = new FormData();
		formData.append("file", this.uploadForm.get("uploadFile")?.value);
		formData.append("type", this.uploadForm.get("type")?.value);
		formData.append("userId", this.id);
		this.docService.uploadUserDocument(formData).subscribe({
			next: () => {
				window.location.reload();
			}
		});
	}

	getUserDocuments() {
		this.docService.getUserDocuments(this.id).subscribe({
			next: (res: UserDocument[]) => {
				console.log(res);
				this.documents = res;
			}
		});
	}

	downloadDocument(name: string) {
		this.docService.downloadUserDocument(name, this.id).subscribe(response => {
			const url = window.URL.createObjectURL(new Blob([response]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "file.pdf");
			document.body.appendChild(link);
			link.click();
		});
	}
}