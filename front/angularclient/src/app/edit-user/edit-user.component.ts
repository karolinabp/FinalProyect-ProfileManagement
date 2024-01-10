import { Component } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  user: User = { id: '', name: '', firstName: '', email: '', userTypeId: '' };
  userTypes: Usertype[] = [];
  message: Message[] = [];
  
  constructor(private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private usertypeService: UsertypeServiceService) { }

  loadUserTypes() {
    this.usertypeService.findAll().subscribe(data => {
      this.userTypes = data;
    });
  }

  /** this method use a service to connect with the api */
  updateUser(user: User): void {
    console.log("Usuario a editar: " + user.id, user.name, user.userTypeId);
    this.userService.updateUser(user.id, user).subscribe(
      response => {
        console.log("Usuario actualizado: " + response);
      },
      error => {
        console.error(error);
      }
    );
    this.router.navigate(['/users']);
    
  }

  ngOnInit(): void {
    this.loadUserTypes();
    this.userService.getUserData().subscribe(user => {
      this.user = user;
    });
  }

}
