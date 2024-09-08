import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    isContributorLoggedIn: boolean = StorageService.isContributorLoggedIn();
    isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();  
    currentUser: any = [];

    constructor(private router: Router){}

     ngOnInit(){
      this.router.events.subscribe(event => {
        this.isContributorLoggedIn = StorageService.isContributorLoggedIn();
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.currentUser  = StorageService.getUser();
      })
     }

     logout() {
      StorageService.logout();
      this.router.navigateByUrl("/login");
     }
}
