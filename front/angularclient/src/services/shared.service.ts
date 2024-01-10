import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  message: Message[] = [];

  public getMessage(){
    return this.message;
  }



  constructor() { }
}
