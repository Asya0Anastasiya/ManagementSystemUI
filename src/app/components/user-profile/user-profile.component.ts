import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { DaysService } from '../services/days-service.service';
import { DaysAccounting } from 'src/app/models/daysAccounting.model';
import { HttpParams } from '@angular/common/http';
import { DaysFiltering } from 'src/app/models/daysFiltering.model';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { RowData } from 'src/app/models/rowData.model';
import { SelectMonthOptions } from 'src/app/models/selectOptions.model';
import { Router } from '@angular/router';
import { SelectDocument } from 'src/app/models/selectDocumentOptions.model';
import { DocumentServiceService } from '../services/document-service.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private api: ApiService, private fb: FormBuilder, 
    private userStore: UserStoreService, private auth: AuthService, 
    private daysService: DaysService, private docService: DocumentServiceService,
    private router: Router){
      this.sickDayForm = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
        userId: new FormControl()
    });
      this.vocationsForm = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
        userId: new FormControl()
      })
  } 


  
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

  daysFilter: DaysFiltering = {
    userId: '',
    fromDate: new Date,
    tillDate: new Date,
    accountingType: ''
  }

  dayAccounting: DaysAccounting = {
    hours: 0,
    date: new Date(),
    accountingType: 0,
    userId: '',
    id: '',
    isConfirmed: false
  }

  row: RowData = {
    date: '',
    hours: 0,
    type: '',
    status: '',
    color: '',
    id: ''
  }


  sickDayForm!: FormGroup;
  vocationsForm!: FormGroup;
  public days: DaysAccounting[] = [];

  public url: string = '';
  public id: string = "";
  month: string = '';
  public totalData: number = 7;
  now: Date = new Date;

  public daysArray: DaysAccounting[] = [];

  @ViewChild('paginator') paginator!: MatPaginator;

  forms: FormGroup[] = []; 
  rows: RowData[] = [];

  docs: SelectDocument[] = [];

  months: SelectMonthOptions[] = [
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'Aughust'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'}
  ];

  ngOnInit(): void {
    this.month = this.getCurrentMonth();
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
      }
    });

    this.initiateUserImage(this.id);
    this.initiateDayFilteringParams(this.id, '');
    this.docService.getUserDocumentsNames(this.id).subscribe((res: string[]) => {
      for (let i = 0; i < res.length; i++) {
        const doc: SelectDocument = {
          value: res[i],
          viewValue: res[i]
        }
        this.docs.push(doc);
      }
    })
  }

  attachDocument(name: string, dateStr: string) {
    debugger
    const date = new Date(dateStr);
    this.docService.attachDocument(this.id, date, name).subscribe({
      next: res => {
        console.log("ok");
      }
    });
    window.location.reload();
  }

  onSubmit() {
    this.daysService.postDays(this.daysArray).subscribe({
      next: (res) => {
        console.log(res);
        //this.router.navigate([`profile/${this.id}`]);
      },
      error: (err => {
        alert(err?.error);
      })
    });
    this.daysArray = [];
    window.location.reload();
  }

  selectionChange(event: any) {
    if (event.isUserInput) {
      this.now.setMonth(event.source.value - 1);
      this.defineIndex();
      this.initiateDayFilteringParams(this.id, '');
      this.ngAfterViewInit();
    }
    
  }

  onCheckboxChange(e: any, i: number) {
      const day: DaysAccounting = {
        hours: this.rows[i].hours,
        date: new Date(this.rows[i].date),
        accountingType: 1,
        userId: this.id,
        id: '',
        isConfirmed: false
      }
      day.date.setHours(5);
    this.daysArray.push(day);
  }

  checkDates(count: number) {
    for (let i = 0; i < count; i++){
      var rowDay = new Date(this.rows[i].date);
      for (let j = 0; j < this.days.length; j++) {
        let asd = new Date(this.days[j].date);
        if (rowDay.getDate() === asd.getDate()) {
          this.rows[i].hours = this.days[j].hours;
          this.rows[i].status = (this.days[j].isConfirmed == true) ? "Confirmed" : "Not confirmed";
          this.rows[i].color = (this.days[j].isConfirmed == true) ? "#1a773c" : "#da4057";
          if (this.days[j].accountingType === 1) {
            this.rows[i].type = 'Work';
          }
          else if (this.days[j].accountingType === 2) {
            this.rows[i].type = 'Vocation';
          }
          else if (this.days[j].accountingType === 3) {
            this.rows[i].type = 'Sick day';
          }
          break;
        }
        else {
          this.rows[i].status = "No info";
          this.rows[i].color = "#cbc327";
        }
      }
      continue;
    }
  }

  initiateForms() {
    for (let i = 1; i <= this.totalData; i++) {
      this.forms.push(new FormGroup({
        hours: new FormControl(),
        date: new FormControl(),
        accountingType: new FormControl(),
        userId: new FormControl(),
        status: new FormControl(),
        color: new FormControl()
      }))
    }
  }

  initiateRowsData(start: number, end: number) {
    for (let i = 0; i < end; i++) {  
      this.rows[i].date = `${this.now.getFullYear()}-${this.now.getMonth() + 1}-${start + i}`;
      this.rows[i].hours = 8;
      this.rows[i].type = '';
      this.rows[i].status = 'No info';
    }
  }

  initiateRows(count:number) {
    for (let i = 1; i <= count; i++) {
      const row: RowData = {
        date: '',
        hours: 0,
        type: '',
        status: '',
        color: '',
        id: ''
      }
      this.rows.push(row);
    }
  }

  initiateFormsWithDates() {
    for (let i = 1; i < this.totalData; i++) {
      this.forms[i].get('date')?.setValue(`${this.now.getFullYear()}-${this.now.getMonth() + 1}-${i}`);
      this.forms[i].get('userId')?.setValue(this.id);
      this.forms[i].get('status')?.setValue('No info');
    }
  }



  postSickDays() {
    let start = new Date(this.sickDayForm.get('start')?.value);
    const end = new Date(this.sickDayForm.get('end')?.value);
    while (start <= end ) {
      const dateSt = new Date(start);
      const day: DaysAccounting = {
        hours: 8,
        date: dateSt,
        accountingType: 3,
        userId: this.id,
        id: '',
        isConfirmed: true
      }
      this.daysArray.push(day);
      start.setDate(start.getDate() + 1);
    }
    this.daysService.postDays(this.daysArray).subscribe({
      next: (res) => {
      },
      error:  (err => {
        alert(err?.error);
      })
    });
    this.daysArray = [];
    window.location.reload();
  }

  postVocations() {
    debugger
    let start = new Date(this.vocationsForm.get('start')?.value);
    const end = new Date(this.vocationsForm.get('end')?.value);
    while (start <= end ) {
      const dateSt = new Date(start);
      const day: DaysAccounting = {
        hours: 8,
        date: dateSt,
        accountingType: 4,
        userId: this.id,
        id: '',
        isConfirmed: false
      }
      this.daysArray.push(day);
      start.setDate(start.getDate() + 1);
    }
    this.daysService.postDays(this.daysArray).subscribe({
      next: (res) => {
      },
      error:  (err => {
        alert(err?.error);
      })
    });
    this.daysArray = [];
    window.location.reload();
  }


  defineIndex() {
    if ([0, 2, 4, 6, 7, 9, 11].includes(this.now.getMonth())) {
      this.totalData = 31;
    }
    else if ([3, 5, 8, 10].includes(this.now.getMonth())) {
      this.totalData = 30;
    }
    else {
      this.totalData = 29;
    }
  }

  initiateUserImage(id: string) {
    this.url = "../../../assets/img/catNews.jpg";
    this.api.getUserImage(id).subscribe(response => {
      const imageUrl = URL.createObjectURL(response);
      this.url = imageUrl;
    }, error => {
      console.log(error);
    });
  }

  getCurrentMonth() : string {
    const months = ['January', 'Febriary', 'March', 'April', 'May', 'June', 'Jule', 'Aughust', 'September', 'October', 'November'];
    return months[this.now.getMonth()];
  }

  initiateDayFilteringParams(userId: string, accountingType: string) {
    //const now = new Date();
    if (this.now.getDate() <= 5) {
      this.daysFilter.fromDate = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
      this.daysFilter.tillDate = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
    }
    else if (this.now.getDate() >= 26) {
      this.daysFilter.fromDate = new Date(this.now.getFullYear(), this.now.getMonth(), 26);
      this.daysFilter.tillDate = new Date(this.now.getFullYear(), this.now.getMonth(), 31);
    }
    else {
      this.daysFilter.fromDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() - 2);
      this.daysFilter.tillDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 2);
    }
    this.daysFilter.userId = userId;
    this.daysFilter.accountingType = accountingType;
  }

  ngAfterViewInit() {
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('userId', this.daysFilter.userId);
        httpParams = httpParams.set('tillDate', `${this.daysFilter.tillDate.getFullYear()}-${this.daysFilter.tillDate.getMonth() + 1}-${this.paginator.pageSize * (this.paginator.pageIndex + 1)}`);
        httpParams = httpParams.set('fromDate', `${this.daysFilter.fromDate.getFullYear()}-${this.daysFilter.fromDate.getMonth() + 1}-${this.paginator.pageSize * (this.paginator.pageIndex + 1) - (this.paginator.pageSize - 1)}`);
        httpParams = httpParams.set('accountingType', this.daysFilter.accountingType);
        return this.daysService.getUsersDays(
          httpParams,
          this.paginator.pageIndex + 1, this.paginator.pageSize
        ).pipe(catchError(() => observableOf(null)));
      }),
      map((empData) => {
        if (empData == null) return [];
        const headers = empData.headers.get('x-pagination');
        if (headers != null) {
          //const myJson = JSON.parse(headers);
          //this.totalData = myJson.totalData
        }
        return empData.body;
      })
    )
    .subscribe((empData: any) => {
      if (empData != null) {
        this.days = empData;
        const currentMonth = new Date().getMonth();
        if (this.now.getMonth() == currentMonth) {
          this.totalData = this.now.getDate();
        }
        
        this.rows = [];
        this.initiateRows(this.paginator.pageSize);
        this.initiateRowsData(this.paginator.pageSize * (this.paginator.pageIndex + 1) - (this.paginator.pageSize - 1), this.paginator.pageSize);
        this.checkDates(this.paginator.pageSize);
      }      
    })
  }
}
