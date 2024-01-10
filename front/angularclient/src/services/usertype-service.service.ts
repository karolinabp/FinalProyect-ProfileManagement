import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { Usertype } from '../app/usertype';

@Injectable({
  providedIn: 'root'
})
export class UsertypeServiceService {

  private userTypeData: Usertype = { id: '', type: ''};
  private userTypesUrl: string = "";

  constructor(private http: HttpClient) { 
    this.userTypesUrl = 'http://localhost:8080/userTypes';
  }

  /** Methods to share data between components */
  /**----------------------------------------- */
  setUserTypeData(userType: Usertype): void {
    this.userTypeData = userType;
  }

  getUserTypeData(): Observable<Usertype> {
    return new Observable(observer => {
      observer.next(this.userTypeData);
      observer.complete();
    });
  }
 /**----------------------------------------- */

  // GET POST PATCH AND DELETE METHODS for UserType
  /**---------------------------------------------------------- */
  /** GET method */
  public findAll(): Observable<Usertype[]>{
    return this.http.get<Usertype[]>(this.userTypesUrl);
  }

  /** POST method */
  public save(usertype: Usertype) {
    return this.http.post<Usertype>(this.userTypesUrl, usertype, {responseType: 'text' as 'json'});
  }

  /** DELETE method */
  public deleteUserType(id: string): Observable<string> {
    const url = `${this.userTypesUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(response => response as string)
    );
  }

  /** PATCH method -  In this case I just passed the type name as an argument instead of the UserType object*/
  public updateUserTypeName(id: string, newType: string): Observable<string> {
    const url = `${this.userTypesUrl}/editTypeName/${id}`;
    const requestBody = `${newType}`;
    
    return this.http.patch(url, requestBody, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => throwError(error))
    );
  }
  /**---------------------------------------------------------- */

}
