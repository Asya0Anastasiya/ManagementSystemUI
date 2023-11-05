import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private userStore: UserStoreService, private fb: FormBuilder, private auth: AuthService, private api: ApiService, private route: ActivatedRoute) {}

  public url: string = '';

  userDetails: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    branchOffice: '',
    unConfirmedDaysCount: 0,
    phoneNumber: '',
    workDays: 0,
    sickDays: 0,
    holidays: 0,
    paidDays: 0,
    url: ''
  };

  personalForm!: FormGroup;
  positionForm!: FormGroup;

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.api.getUser(id).subscribe({
            next: (response) => {
              this.userDetails.id = response.id;
              this.userDetails.firstName = response.firstName;
              this.userDetails.lastName = response.lastName;
              this.userDetails.email = response.email;
              this.userDetails.department = response.department;
              this.userDetails.position = response.position;
              this.userDetails.branchOffice = response.branchOffice;

              this.personalForm.get('firstname')?.setValue(this.userDetails.firstName);
              this.personalForm.get('lastname')?.setValue(this.userDetails.lastName);
              this.personalForm.get('email')?.setValue(this.userDetails.email);
              this.personalForm.get('phoneNumber')?.setValue(this.userDetails.phoneNumber);

              this.positionForm.get('position')?.setValue(this.userDetails.position);
              this.positionForm.get('department')?.setValue(this.userDetails.department);
              this.positionForm.get('branchOffice')?.setValue(this.userDetails.branchOffice);
            }
          });
      
        this.initiateUserImage(id);

        this.personalForm = this.fb.group({
          firstname: [''],
          lastname: [''],
          email: [''],
          phoneNumber: ['']
        });

        this.positionForm = this.fb.group({
          position: [''],
          department: [''],
          branchOffice: [''],
          Address: ['']
        });
        }
      }
    })
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
}
