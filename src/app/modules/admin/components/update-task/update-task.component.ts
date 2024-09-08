import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

/**
 * Component to update a task by admin.
 */
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  id: number = this.route.snapshot.params["id"];
  updateTaskForm!: FormGroup;
  listOfContributors: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar

  ) {
    this.updateTaskForm = this.fb.group({
      contributorId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null]
    });
    this.getTaskById();
    this.getUsers();
  }

  /**
 * Function to get task by task id.
 */
  getTaskById() {
    this.adminService.getTaskById(this.id).
      subscribe({
        next: (res) => {
          this.updateTaskForm.patchValue(res);
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
 * Function to get all contributor users.
 */
  getUsers() {
    this.adminService.getUsers().
      subscribe({
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
 * Function to update a selected task by id.
 */
  updateTask() {
    this.adminService.updateTask(this.id, this.updateTaskForm.value).
      subscribe({
        next: (res) => {
          if (res.id != null) {
            this.snackbar.open("Task updated successfully", "close", { duration: 4000 });
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
 * Function to disable past dates in mat calender.
 */
  disablePastDates = (d: Date | null): boolean => {
    const today = new Date();
    const dateWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Disable dates before today (returns false for past dates)
    return d ? d >= dateWithoutTime : false;
  };
}
