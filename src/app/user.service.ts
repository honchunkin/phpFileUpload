import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost/its.php';
  users: User[];

  constructor(private http: HttpClient) { }

  /*
  getUser(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}.php`).pipe(
      map((res) => {
        this.users = res['data'];
        console.log(res['data']);
        console.log(this.users);
        return this.users;
      }),
      catchError(this.handleError));
  }
  */

  getUser() {
    return this.http.get(this.baseUrl);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
