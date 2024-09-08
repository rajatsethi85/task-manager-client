import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { environment } from 'src/environments/environment';

/**
* Service to hit contributor API's
*/
@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  constructor(private http: HttpClient) { }

  /**
* Function to getTask for the logged in contributor.
*/
  getCurrentUserTasks(): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/contributor/tasks", {
      headers: this.createAuthorizationHeader()
    })
  }

  /**
* Function to update status of task.
* @param id
* @param status
*/
  updateStatus(id: number, status: string): Observable<any> {
    let params = new HttpParams().set('status', status);
    return this.http.put(environment.BASE_URL + `api/contributor/tasks/${id}`, null, {
      headers: this.createAuthorizationHeader(),
      params: params
    })
  }

  /**
* Function to add authorization headers to request.
*/
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }
}
