import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { tap, catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

/**
 * Component to add a new task.
 */
@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {

  taskForm!: FormGroup;
  listOfContributors: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.taskForm = this.fb.group({
      contributorId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
    this.getUsers();
  }

  /**
 * Function to get all users to assign the task.
 */
  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.listOfContributors = res;
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
 * Function to post a new task.
 */
  postTask() {
    this.adminService.postTask(this.taskForm.value).
      subscribe({
        next: (res) => {
          if (res.id != null) {
            this.snackbar.open("Task posted successfully", "close", { duration: 4000 });
            this.router.navigateByUrl("/admin/dashboard");
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
 * Function to disable past dates.
 */
  disablePastDates = (d: Date | null): boolean => {
    const today = new Date();
    const dateWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Disable dates before today (returns false for past dates)
    return d ? d >= dateWithoutTime : false;
  };

}
