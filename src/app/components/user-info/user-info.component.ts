import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private userStore: UserStoreService, private auth: AuthService, private api: ApiService) {}

  public url: string = '';
  public id: string = '';

  userDetails: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    level: '',
    unConfirmedDaysCount: 0,
    phoneNumber: '',
    workDays: 0,
    sickDays: 0,
    holidays: 0,
    paidDays: 0,
    url: ''
  };

  ngOnInit(): void {
    this.userStore.getIdFromStore()
    .subscribe(val => {
      const idFromToken = this.auth.getIdFromToken();
      this.id = val || idFromToken;
    });

    this.api.getUser(this.id).subscribe({
      next: (response) => {
        this.userDetails.id = response.id;
        this.userDetails.firstName = response.firstName;
        this.userDetails.lastName = response.lastName;
        this.userDetails.email = response.email;
        this.userDetails.department = response.department;
        this.userDetails.position = response.position;
        this.userDetails.level = response.level;
      }
    });

    this.initiateUserImage(this.id);
  }

  initiateUserImage(id: string){
    this.api.getUserImage(id).subscribe(response => {
      const imageUrl = URL.createObjectURL(response);
      this.url = imageUrl;
    }, error => {
      console.log(error);
    });
  }
}
