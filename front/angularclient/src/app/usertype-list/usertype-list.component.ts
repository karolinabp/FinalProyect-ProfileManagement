import { Component, OnInit } from '@angular/core';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertype-list',
  templateUrl: './usertype-list.component.html',
  styleUrl: './usertype-list.component.css'
})
export class UsertypeListComponent implements OnInit{

  userTypes: Usertype[] = [];
  sortedUserTypes: any[] = []; 
  currentSortOrder: string = 'asc';

  constructor(private userTypeService: UsertypeServiceService,
    private router: Router){

  }

  sortUserTypes() {
    if (this.currentSortOrder === 'asc') {
      this.sortedUserTypes = this.userTypes.slice().sort((a, b) => parseInt(a.id) - parseInt(b.id));
      this.currentSortOrder = 'desc';
      console.log(this.sortedUserTypes);
    } else {
      this.sortedUserTypes = this.userTypes.slice().sort((a, b) => parseInt(b.id) - parseInt(a.id));
      this.currentSortOrder = 'asc';
      console.log(this.sortedUserTypes);
    }
  }

  deleteUserType(id: string): void {
    this.userTypeService.deleteUserType(id).subscribe(
      response => {
        console.log("confrimado borrado "+response);
        this.userTypeService.findAll().subscribe(data => {
          this.userTypes = data;
          this.sortedUserTypes = data;
        });
        this.router.navigate(['/userTypes']); 
      },
      error => {
        console.error("fallo"); 
      }
    );
  }
  
  editUserType(userType: Usertype): void {
    this.userTypeService.setUserTypeData(userType);
    console.log("usuario cargado:", userType.id, userType.type);
    this.router.navigate(['/editUserType']);
  }

  ngOnInit() {
    
    this.userTypeService.findAll().subscribe(data => {
      this.userTypes = data;
      this.sortedUserTypes = data;
    });
  }
}
