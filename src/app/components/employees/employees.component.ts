import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public users: Employee[] = [];

  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.api.getUsers()
    .subscribe({
      next: (users) => {
      this.users = users;},
      error: (error) => {
        console.log(error);
      }
    })
  }
}
