import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public role: string = "";
  public email: string = "";

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserStoreService){}

  ngOnInit(): void {
    this.api.getUsers()
    .subscribe(res =>{
      this.users = res;

      this.userStore.getEmailFromStore()
      .subscribe(val => {
        const emailFromToken = this.auth.getEmailFromToken();
        this.email = val || emailFromToken;
      })
    })

    this.userStore.getRoleFromStore()
    .subscribe(val =>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

  }

  logOut(){
    this.auth.signout();
  }
}
