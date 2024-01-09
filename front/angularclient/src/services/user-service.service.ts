import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../app/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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
}
