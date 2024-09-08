import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { environment } from 'src/environments/environment';

/**
 * Service to hit admin API's.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  /**
 * Function to hit get all users API.
 * @returns observable
 */
  getUsers(): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/admin/users", {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to hit get all tasks API.
* @returns observable
*/
  getAllTasks(): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/admin/tasks", {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to hit post task API.
* @returns observable
*/
  postTask(taskDto: any): Observable<any> {
    return this.http.post(environment.BASE_URL + "api/admin/task", taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to hit update task API.
* @param id
* @param taskDto
* @returns observable
*/
  updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `api/admin/task/${id}`, taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to hit delete task by id API.
* @param id
* @returns observable
*/
  deleteTaskById(id: number): Observable<any> {
    return this.http.delete(environment.BASE_URL + "api/admin/task/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to hit get task by id API.
* @param id
* @returns observable
*/
  getTaskById(id: number): Observable<any> {
    return this.http.get(environment.BASE_URL + "api/admin/task/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  /**
* Function to add Authorization to headers.
* @returns observable
*/
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }
}
