import { Component } from '@angular/core';
import { Usertype } from '../usertype';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UsertypeServiceService } from '../../services/usertype-service.service';

@Component({
  selector: 'app-usertype-form',
  templateUrl: './usertype-form.component.html',
  styleUrl: './usertype-form.component.css'
})
export class UsertypeFormComponent {

  userType: Usertype;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private usertypeService: UsertypeServiceService){
    this.userType = new Usertype;
  }

  
  OnSubmit() {
    this.usertypeService.save(this.userType).subscribe(result => this.gotoUserTypesList());
  }

  gotoUserTypesList(){
    this.router.navigate(['/userTypes']);
  }
}
