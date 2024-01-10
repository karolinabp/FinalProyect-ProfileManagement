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

  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user, {responseType: 'text' as 'json'});
  }

  public deleteUser(id: string): Observable<string> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(response => response as string)
    );
  }

  
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

  public updateUser(id: string, newUser: User): Observable<string> {

    console.log("conectando con la api...");
    console.log(newUser);
    const url = `${this.usersUrl}/editUser/${id}`;
    const requestBody = JSON.stringify(newUser);
    
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


  setUserData(user: User): void {
    this.userData = user;
  }

  getUserData(): Observable<User> {
    return new Observable(observer => {
      observer.next(this.userData);
      observer.complete();
    });
  }


}
