import { Component, OnInit } from '@angular/core';
import { Usertype } from '../usertype';
import { UsertypeServiceService } from '../../services/usertype-service.service';

@Component({
  selector: 'app-usertype-list',
  templateUrl: './usertype-list.component.html',
  styleUrl: './usertype-list.component.css'
})
export class UsertypeListComponent implements OnInit{

  userTypes: Usertype[] | undefined;

  constructor(private userTypeService: UsertypeServiceService){

  }

  ngOnInit() {
    
    this.userTypeService.findAll().subscribe(data => {
      this.userTypes = data;
    })
  }
}
