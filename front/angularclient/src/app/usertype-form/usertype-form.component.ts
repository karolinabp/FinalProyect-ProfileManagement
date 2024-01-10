import { Component } from '@angular/core';
import { Usertype } from '../usertype';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-usertype-form',
  templateUrl: './usertype-form.component.html',
  styleUrl: './usertype-form.component.css'
})
export class UsertypeFormComponent {

  userType: Usertype;

  messages: Message[] = [];

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private usertypeService: UsertypeServiceService){
    this.userType = new Usertype;
  }

  /** This method also connect with the usertype service to save a new type*/
  OnSubmit() {
    this.usertypeService.save(this.userType).subscribe(
      result => {
        this.gotoUserTypesList();
      },
      error => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'This user type name already exists'}];
        console.error('Error al guardar el usuario:', error);
      }
    );
  }

  gotoUserTypesList(){
    this.router.navigate(['/userTypes']);
  }
}
