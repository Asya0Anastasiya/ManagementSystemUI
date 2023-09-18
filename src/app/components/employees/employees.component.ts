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

  constructor(private api: ApiService, private userStore: UserStoreService, private auth: AuthService, private fb: FormBuilder, private daysService: DaysService){}

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
      debugger
      this.userStore.getRoleFromStore()
        .subscribe(val => {
          const roleFromToken = this.auth.getRoleFromToken();
          this.role = val || roleFromToken;
        })

    // передавать айди каждого юзера, а не текущего
    this.initiateUserImage(this.id);
    //this.ngAfterViewInit();
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
        this.users[i].url = this.initiateUserImage(this.users[i].id);
        this.daysService.getUnconfirmedDaysCount(this.users[i].id).subscribe({
          next: res => {
            this.users[i].unConfirmedDaysCount = res;
          }
        })
      }   
    })
  }

  onSearch(){
    let httpParams = new HttpParams();
        httpParams = httpParams.set('firstname', this.searchForm.get('firstname')?.value);
        httpParams = httpParams.set('lastname', this.searchForm.get('lastname')?.value);
        httpParams = httpParams.set('email', this.searchForm.get('email')?.value);       
        this.ngAfterViewInit(httpParams);
  }

  initiateUserImage(id: string) : string {
    this.api.getUserImage(id).subscribe(response => {
      const imageUrl = URL.createObjectURL(response);
      this.url = imageUrl;
      console.log('j');
      return imageUrl;
    });
    return '';
  }
}
