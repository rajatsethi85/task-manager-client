import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { environment } from 'src/environments/environment';

/**
* Shared service for amdin and contributor roles.
*/
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  /**
* Function to getTask by id.
* @param id
*/
  getTaskById(id: number): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/common/task/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to publish a comment on a task.
* @param id
* @param content
*/
  publishComment(id: number, content: string): Observable<any> {
    return this.http.post(environment.BASE_URL + "api/common/task/comment/" + id, content, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to get all comments on the task by task id.
*/
  getCommentsByTaskId(id: number): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/common/task/comment/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to set authorization in headers.
*/
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }
}
