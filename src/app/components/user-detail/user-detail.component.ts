import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userDetails: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date('2023-12-12'),
    workDays: 0,
    sickDays: 0,
    holidays: 0,
    paidDays: 0
  };

  constructor(private route: ActivatedRoute, private api: ApiService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const email = params.get('email');
        if (email){
          // изменить на получение меясца с фронта!!!
          this.api.getUser(email).subscribe({
            next: (response) => {
              this.userDetails = response;
            }
          })
        }
      }
    })
  }

}
