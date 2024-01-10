import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../../services/user-service.service';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SharedService } from '../../services/shared.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userTypes: Usertype[] = [];
  sortedUsers: any[] = []; 
  currentSortOrder: string = 'asc';
 
  message: Message[] = [];

  constructor(private userService: UserServiceService,
    private userTypeService: UsertypeServiceService,
    private sharedService: SharedService,
    public dialog: MatDialog, 
    private router: Router) { }


  openUserProfileDialog(user: User): void {
    const dialogRef = this.dialog.open(UserCardComponent, {
      data: {
        id: user.id,
        userType: this.getUserType(user.userTypeId),
        name: user.name,
        firstName: user.firstName,
        email: user.email
      }
    });

    console.log("data: " + dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log("confrimado borrado "+response);
        this.userService.findAll().subscribe(data => {
          this.users = data;
          this.sortedUsers = data;
        });
        this.router.navigate(['/users']); 
        this.message = [{ severity: 'success', summary: 'Success', detail: 'User deleted successfully' }];
      },
      error => {
        console.error(error); 
      }
    );
  }

  editUser(user: User): void {
    this.userService.setUserData(user);
    console.log("usuario cargado:", user.id, user.name);
    this.router.navigate(['/editUser']);
  }
  
  sortUsersByType() {
    if (this.currentSortOrder === 'asc') {
      this.sortedUsers = this.users.slice().sort((a, b) => parseInt(a.userTypeId) - parseInt(b.userTypeId));
      this.currentSortOrder = 'desc';
      console.log(this.sortedUsers);
    } else {
      this.sortedUsers = this.users.slice().sort((a, b) => parseInt(b.userTypeId) - parseInt(a.userTypeId));
      this.currentSortOrder = 'asc';
      console.log(this.sortedUsers);
    }
  }

  sortUsersByName() {
    if (this.currentSortOrder === 'asc') {
      this.sortedUsers = this.users.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.currentSortOrder = 'desc';
      console.log(this.sortedUsers);
    } else {
      this.sortedUsers = this.users.slice().sort((a, b) => b.name.localeCompare(a.name));
      this.currentSortOrder = 'asc';
      console.log(this.sortedUsers);
    }
  }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.sortedUsers = data;
    });

    this.userTypeService.findAll().subscribe(data => {
      this.userTypes = data;
      if (!this.userTypes || this.userTypes.length === 0) {
        this.message = [{ severity: 'warn', summary: 'Warning', detail: 'You need to add a User Type' }];
        console.log("tipos:", this.userTypes.length);
      }
    });

  }

  

  getUserType(typeId: string): string {
    const userType = this.userTypes?.find(type => type.id === typeId);
    return userType ? userType.type : 'Unknown Type';

  }

}

