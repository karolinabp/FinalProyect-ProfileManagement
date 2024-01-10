import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../../services/user-service.service';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

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
    public dialog: MatDialog, 
    private router: Router) { }

  /** This method return a user type by passing the id as argument */
  getUserType(typeId: string): string {
    const userType = this.userTypes?.find(type => type.id === typeId);
    return userType ? userType.type : 'Unknown Type';
  }

  /** This method is to open the user card component to show the user profile */
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
    /** This code closes the card component */
    console.log("data: " + dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
    });
  }

  /** This method uses a service to connect with the api */
  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log("deleted successfully "+response);
        this.userService.findAll().subscribe(data => {
          this.users = data;
          /** I need to update the sortedUsers array too, to update the users list */
          this.sortedUsers = data;
        });
        this.router.navigate(['/users']); 
        /** I use the library primeng to show messages, in this case the user has been deleted successfully */
        this.message = [{ severity: 'success', summary: 'Success', detail: 'User deleted successfully' }];
      },
      error => {
        console.error(error); 
        /** The same,  with errors*/
        this.message = [{ severity: 'error', summary: 'Error', detail: 'Error deleting user' }];

      }
    );
  }
  /** This method use the same service to connect with the api and navigates to the edit user component*/
  editUser(user: User): void {
    this.userService.setUserData(user);
    this.router.navigate(['/editUser']);
  }
  

  /** These two methods sort the users, by type and by name */
  /**------------------------------------------------------ */
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
  /**------------------------------------------------------ */

  ngOnInit() {
    /** I update the users and user types every time this component is charged */
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.sortedUsers = data;
    });

    this.userTypeService.findAll().subscribe(data => {
      this.userTypes = data;
      /** If there is no user type, it shows a warning message with primeng */
      if (!this.userTypes || this.userTypes.length === 0) {
        this.message = [{ severity: 'warn', summary: 'Warning', detail: 'You need to add a User Type' }];
        console.log("tipos:", this.userTypes.length);
      }
    });

  }

}

