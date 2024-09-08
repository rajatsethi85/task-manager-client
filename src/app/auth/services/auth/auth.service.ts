import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Service responsible for authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

/**
 * Function to hit the signup API.
 * @param signupRequest
 * @returns Observable
 */
  signup(signupRequest: any): Observable<any> {
    return this.http.post(environment.BASE_URL + "api/auth/signup", signupRequest);
  }

/**
 * Function to hit the login API.
 * @param loginRequest
 * @returns Observable
 */
  login(loginRequest: any): Observable<any> {
    return this.http.post(environment.BASE_URL + "api/auth/login", loginRequest).pipe(
      catchError((error) => this.handleError(error))
    );
  }

/**
 * Function to handle error.
 * @param error
 * @returns error
 */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMesage: string;
    if (error?.error instanceof ErrorEvent) {
      console.error('client-side error: ', error?.error?.message);
      errorMesage = `client-side error: ${error?.error?.message}`;
    } else {
      console.error(`server-side error code ${error?.status}: ', body: ${error?.error}`);
      errorMesage = `server-side error: ${error?.status}, Message: ${error?.message}`;
    }
    return throwError(() => error);
  }
}
