import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../../services/user-service.service';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] | undefined;
  userTypes: Usertype[] | undefined;

  constructor(private userService: UserServiceService,
    private userTypeService: UsertypeServiceService,
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
        });
        this.router.navigate(['/users']); 
      },
      error => {
        console.error(error); 
      }
    );
  }

  


  ngOnInit() {

    this.userService.findAll().subscribe(data => {
      this.users = data;
    });

    this.userTypeService.findAll().subscribe(data => {
      this.userTypes = data;
    });

  }

  getUserType(typeId: string): string {
    const userType = this.userTypes?.find(type => type.id === typeId);
    return userType ? userType.type : 'Unknown Type';

  }

}

