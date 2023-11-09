import { Component, OnInit } from '@angular/core';
import { DocumentServiceService } from '../services/document-service.service';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserDocument } from 'src/app/models/document.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss']
})
export class UserDocumentComponent implements OnInit {

  constructor(private userStore: UserStoreService, private auth: AuthService, private docService: DocumentServiceService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userStore.getIdFromStore()
    .subscribe(val => {
      const idFromToken = this.auth.getIdFromToken();
      this.id = val || idFromToken;
    });

    this.getUserDocuments();

    this.uploadForm = this.fb.group({
      uploadFile: FormData,
      type: ['', Validators.required]
    })
  }

  id: string = '';
  selectedDoc!: any;
  public documents: UserDocument[] = [];
  uploadForm!: FormGroup;

  onDocumentSelected(event: any) {
    this.selectedDoc = event.target.files[0];
    this.uploadForm.get('uploadFile')?.setValue(this.selectedDoc);
    console.log("jjjf");
  }

  uploadDocument() {
    
  }

  onSubmitForm() {
    let formData = new FormData();
    formData.append('file', this.uploadForm.get('uploadFile')?.value);
    formData.append('type', this.uploadForm.get('type')?.value);
    formData.append('userId', this.id);
    this.docService.uploadUserDocument(formData).subscribe({
        next: (res) => {
          console.log("ok");
        }
      });
    window.location.reload();
  }

  getUserDocuments() {
    this.docService.getUserDocuments(this.id).subscribe({
      next: (res: UserDocument[]) => {
        console.log(res);
        this.documents = res;
      }
    })
  }

  a: string = '';

  downloadDocument(name: string) {
    this.docService.downloadUserDocument(name, this.id).subscribe(response => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    })
  }
}
