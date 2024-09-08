import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

/**
 * Component responsible for login operations.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hidePassword = true;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

/**
 * Function to toggle password visibility on login page.
 */
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

/**
 * Function to submit a login request.
 */
  onSubmit() {
    const password = this.loginForm.get("password")?.value;
    const encodedPassword = btoa(unescape(encodeURIComponent(password)));

    const loginReq = {
      "email": this.loginForm.get("email")?.value,
      "password": encodedPassword
    }
    this.authService.login(loginReq).subscribe({
      next: (res) => {
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole,
            name: res.name
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else {
            this.router.navigateByUrl("/contributor/dashboard");
          }
          this.snackbar.open("Login successful", "close", { duration: 4000 });
        }

      },
      error: (err) => {
        if (err.status == "403") {
          this.snackbar.open("Invalid credentials. Try again with correct one.", "close", { duration: 5000, panelClass: "error-snackbar" });
        } else {
          this.snackbar.open("Something went wrong while Login", "ERROR", { duration: 4000 });
        }
        return of(null);
      }
    })

  }

}
