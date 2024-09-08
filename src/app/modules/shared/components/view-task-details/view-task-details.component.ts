import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { SharedService } from '../../services/shared.service';

/**
* Component to view task details and add comments.
*/
@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent implements OnInit {

  taskId: number = this.activatedRoute.snapshot.params["id"];
  taskData: any;
  commentForm!: FormGroup;
  comments: any;

  constructor(private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: [null]
    })
  }

  ngOnInit(): void {
    this.getTaskById();
  }

  /**
* Function to getTask by id to view.
*/
  getTaskById() {
    this.sharedService.getTaskById(this.taskId).subscribe({
      next: (res) => {
        this.taskData = res;
        this.getCommentsByTaskId();
      },
      error: (err) => {
        if (err.status == "403") {
          this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
          this.router.navigateByUrl("/login");
          StorageService.logout();
        } else {
          this.snackbar.open("Something went wrong while updating task", "ERROR", { duration: 4000 });
        }
        return of(null);
      }
    });
  }

  /**
* Function to get comments for the particular task.
*/
  getCommentsByTaskId() {
    this.sharedService.getCommentsByTaskId(this.taskId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        if (err.status == "403") {
          this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
          this.router.navigateByUrl("/login");
          StorageService.logout();
        } else if (err.status == "404") {
          this.snackbar.open("No comments for this task", "Close", { duration: 8000 });
        } else {
          this.snackbar.open("Something went wrong while fetching comments for this task", "ERROR", { duration: 4000 });
        }
        return of(null);
      }
    });
  }

  /**
* Function to add new comment on task.
*/
  publishComment() {
    if (this.commentForm.value.content == null || this.commentForm.value.content.trim().length == 0) {
      this.snackbar.open("Comment section is empty. Add comment to publish a comment.", "close", { duration: 5000 });
      return;
    }
    this.sharedService.publishComment(this.taskId, this.commentForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.getCommentsByTaskId();
          this.commentForm.reset();
          this.snackbar.open("Comment posted successfully", "close", { duration: 5000 });
        }
      },
      error: (err) => {
        if (err.status == "403") {
          this.snackbar.open("Login timeout. Try after login", "close", { duration: 5000, panelClass: "error-snackbar" });
          this.router.navigateByUrl("/login");
          StorageService.logout();
        } else {
          this.snackbar.open("Something went wrong while updating task", "ERROR", { duration: 4000 });
        }
        return of(null);
      }
    });
  }

}
