import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';

/**
 * Component for signup page operations.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hidePassword = true;
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

/**
 * Function for toggling password visibility.
 */
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

/**
 * Submitting a signup form for creating a new contributor account.
 */
  onSubmit() {
    const password = this.signupForm.get("password")?.value;
    const encodedPassword = btoa(unescape(encodeURIComponent(password)));
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      this.snackbar.open("Password do not match", "close", { duration: 3000 });
      return;
    }
    let signupReq = this.signupForm.value;
    delete signupReq.confirmPassword;
    signupReq.password = encodedPassword;
    this.authService.signup(signupReq).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.snackbar.open("Signup successful", "close", { duration: 4000 });
          this.router.navigateByUrl("/login");
        } else {
          this.snackbar.open("Signup failed. Try again", "close", { duration: 4000, panelClass: "error-snackbar" });
        }
      },
      error: (err) => {
        if (err?.error == "User already exist with this email") {
          this.snackbar.open("User already exist with this email", "close", { duration: 4000, panelClass: "error-snackbar" });
        } else {
          this.snackbar.open("Something went wrong", "close", { duration: 4000, panelClass: "error-snackbar" });
        }
        return of(null); // Return a safe fallback value or empty observable in case of error
      }
    });
  }

}
