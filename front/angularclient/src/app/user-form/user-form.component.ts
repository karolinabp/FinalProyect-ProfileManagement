import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { Message } from 'primeng/api';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html', 
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userTypes: Usertype[] = [];
  user: User;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserServiceService, 
    private usertypeService: UsertypeServiceService,
    private sharedService: SharedService){
    this.user = new User();
  }

  ngOnInit(): void {
    this.loadUserTypes();
  }

  OnSubmit() {
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
  }

  gotoUserList(){
    this.router.navigate(['/users']);
  }

  loadUserTypes() {
    this.usertypeService.findAll().subscribe(data => {
      this.userTypes = data;
    });
  }
}
