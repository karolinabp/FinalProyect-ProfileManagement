import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usertype } from '../app/usertype';

@Injectable({
  providedIn: 'root'
})
export class UsertypeServiceService {

  private userTypesUrl: string = "";

  constructor(private http: HttpClient) { 
    this.userTypesUrl = 'http://localhost:8080/userTypes';
  }

  public findAll(): Observable<Usertype[]>{
    return this.http.get<Usertype[]>(this.userTypesUrl);
  }

  public save(usertype: Usertype) {
    return this.http.post<Usertype>(this.userTypesUrl, usertype, {responseType: 'text' as 'json'});
  }
}
