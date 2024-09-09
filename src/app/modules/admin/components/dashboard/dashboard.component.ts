import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { PageEvent } from '@angular/material/paginator';


/**
 * Component for admin dashboard.
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
  constructor(private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * Function to get all tasks for admin dashboard.
   */
  getTasks() {
    this.adminService.getAllTasks(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.listOfTasks = res.data;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        if (err.status == "403") {
          this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
          StorageService.logout();
          this.router.navigateByUrl("/login");
        } else if (err.status == "404") {
          this.snackbar.open("No tasks found. Create new tasks", "Close", { duration: 5000 });
        } else {
          this.snackbar.open("Something went wrong while fetching tasks", "ERROR", { duration: 5000 });
        }
        return of(null);
      }
    });
  }

  /**
 * Function to delete task with id.
 * @param id
 */
  deleteTask(id: number) {
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.adminService.deleteTaskById(id).subscribe({
        next: () => {
          this.getTasks();
          this.snackbar.open("Task successfully deleted", "Close", { duration: 5000 });
          this.listOfTasks = [];
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
