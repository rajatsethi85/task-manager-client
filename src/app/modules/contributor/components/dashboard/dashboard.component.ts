import { Component, OnInit } from '@angular/core';
import { ContributorService } from '../../services/contributor.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { PageEvent } from '@angular/material/paginator';


/**
* Component for contributor dashboard.
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listOfTasks: any = [];
  pageSize: number = 6;
  currentPage: number = 0;
  totalElements: number = 0;

  constructor(private contributorService: ContributorService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.getTasks();
  }

  ngOnInit(): void {
  }

  /**
* Function to getTask for the logged in contributor.
*/
  getTasks() {
    this.contributorService.getCurrentUserTasks(this.currentPage, this.pageSize).
      subscribe({
        next: (res) => {
          if (res != null) {
            this.listOfTasks = res.data;
            this.totalElements = res.totalElements;
          }
        },
        error: (err) => {
          if (err.status == "403") {
            this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
            this.router.navigateByUrl("/login");
            StorageService.logout();
          } else if (err.status == "404") {
            this.snackbar.open("No tasks assigned to you currently. ENJOY!", "Close", { duration: 8000 });
          } else {
            this.snackbar.open("Something went wrong while fetching tasks", "ERROR", { duration: 5000 });
          }
          return of(null);
        }
      });
  }

  /**
* Function to update status for task by id.
* @param id
* @param status
*/
  updateStatus(id: number, status: string) {
    this.contributorService.updateStatus(id, status).
      subscribe({
        next: (res) => {
          if (res) {
            this.getTasks();
            this.snackbar.open(`Task status uptaded to ${status}`, "Close", { duration: 5000 });
          }
        },
        error: (err) => {
          if (err.status == "403") {
            this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
            this.router.navigateByUrl("/login");
            StorageService.logout();
          } else {
            this.snackbar.open("Something went wrong while fetching tasks", "ERROR", { duration: 5000 });
          }
          return of(null);
        }
      });
  }

/**
* Function to detect any change in mat paginator.
* @param $event
*/
  onPageChange($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.getTasks();
    }

}


