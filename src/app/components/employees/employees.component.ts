import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DaysService } from '../services/days-service.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public users: Employee[] = [];
  public url: string = '';
  public id: string = "";
  public role: string = '';
  totalData!: number;
  searchForm!: FormGroup;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private api: ApiService, private userStore: UserStoreService, private auth: AuthService, 
              private fb: FormBuilder, private daysService: DaysService, private router: Router){}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: ['']
    })
    this.userStore.getIdFromStore()
      .subscribe(val => {
        const idFromToken = this.auth.getIdFromToken();
        this.id = val || idFromToken;
      });
      this.userStore.getRoleFromStore()
        .subscribe(val => {
          const roleFromToken = this.auth.getRoleFromToken();
          this.role = val || roleFromToken;
        })
  }

  createEmployee() {
    this.router.navigate(['signup']);
  }

  ngAfterViewInit(httpParams: HttpParams) {
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.api.getUsers(httpParams,
          this.paginator.pageIndex + 1, this.paginator.pageSize
        ).pipe(catchError(() => observableOf(null)));
      }),
      map((empData) => {
        if (empData == null) return [];
        const headers = empData.headers.get('x-pagination');
        if (headers != null) {
          const myJson = JSON.parse(headers);
          this.totalData = myJson.totalData
        }
        return empData.body;
      })
    )
    .subscribe((empData: any) => {
      if (empData != null) {
        this.users = empData;
      }   
      for ( let i = 0; i < this.users.length; i++) {
        this.daysService.getUnconfirmedDaysCount(this.users[i].id).subscribe({
          next: res => {
            this.users[i].unConfirmedDaysCount = res;
          }
        })
      }   
      this.initiateUsersImages(this.users);
    })
  }

  onSearch(){
    let httpParams = new HttpParams();
        httpParams = httpParams.set('firstname', this.searchForm.get('firstname')?.value);
        httpParams = httpParams.set('lastname', this.searchForm.get('lastname')?.value);
        httpParams = httpParams.set('email', this.searchForm.get('email')?.value);       
        this.ngAfterViewInit(httpParams);
  }

  clear() {
    let httpParams = new HttpParams();
    this.ngAfterViewInit(httpParams);
    this.searchForm.reset();
  }

  initiateUsersImages(users: Employee[]) {
    for (let i = 0; i < users.length; i++) {
      users[i].url = "../../../assets/img/catNews.jpg";
      this.api.getUserImage(users[i].id).subscribe(response => {
        if (response.toString() != "Image not found") {
          const imageUrl = URL.createObjectURL(response);
          users[i].url = imageUrl;
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
