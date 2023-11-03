import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'user-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role: string = "";
  public id: string = "";
  public url: string = '';

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserStoreService){}

  logOut(){
    this.auth.signout();
  }

  ngOnInit(): void {
    this.userStore.getRoleFromStore()
    .subscribe(val =>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.userStore.getIdFromStore()
    .subscribe(val => {
      const idFromToken = this.auth.getIdFromToken();
      this.id = val || idFromToken;
    });

    this.initiateUserImage(this.id);
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
