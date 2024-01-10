import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, throwError } from 'rxjs';
import { User } from '../app/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userData: User = { id: '', name: '', firstName: '', email: '', userTypeId: '' };

  private usersUrl: string = "";

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  /** I used these two methods to share data between components */
  /**---------------------------------------------------------- */
  setUserData(user: User): void {
    this.userData = user;
  }

  getUserData(): Observable<User> {
    return new Observable(observer => {
      observer.next(this.userData);
      observer.complete();
    });
  }
  /**---------------------------------------------------------- */

  // GET POST PATCH AND DELETE METHODS for User
  /**---------------------------------------------------------- */
  /** GET method */
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  /** POST method */
  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user, { responseType: 'text' as 'json' });
  }

  /** DELETE method */
  public deleteUser(id: string): Observable<string> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(response => response as string)
    );
  }

  /** PATCH method */
  public updateUser(id: string, newUser: User): Observable<string> {
    const url = `${this.usersUrl}/editUser/${id}`;
    const requestBody = JSON.stringify(newUser);
    return this.http.patch(url, requestBody, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => throwError(error))
    );
  }
  /**---------------------------------------------------------- */


  // The following code is the one I used to test that the connection with the api works propperly
  /** 
  public updateUserProperty(id: string, property: string, newValue: any): Observable<string> {

    console.log("conectando con la api...");
    console.log("tipo:", newValue, "tipo del tipo:", typeof(newValue));
    const url = `${this.usersUrl}/edit${property}/${id}`;
    const requestBody = `${newValue}`;
    
    return this.http.patch(url, requestBody, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => throwError(error))
    );
  }

  public updateUserName(id: string, newName: string): Observable<string> {
    return this.updateUserProperty(id, 'Name', newName);
  }

  public updateUserFirstName(id: string, newFirstName: string): Observable<string> {
    return this.updateUserProperty(id, 'FirstName', newFirstName);
  }

  public updateUserEmail(id: string, newEmail: string): Observable<string> {
    return this.updateUserProperty(id, 'Email', newEmail);
  }

  public updateUserType(id: string, newType: string): Observable<string> {
    const newTypeInt = parseInt(newType);
    return this.updateUserProperty(id, 'Type', newTypeInt);
  }

  */

}
