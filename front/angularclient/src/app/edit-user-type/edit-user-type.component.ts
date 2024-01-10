import { Component } from '@angular/core';
import { Usertype } from '../usertype';
import { Router, ActivatedRoute } from '@angular/router';
import { UsertypeServiceService } from '../../services/usertype-service.service';
import { SharedService } from '../../services/shared.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-edit-user-type',
  templateUrl: './edit-user-type.component.html',
  styleUrl: './edit-user-type.component.css'
})
export class EditUserTypeComponent {

  userType: Usertype = { id: '', type: ''};
  messages: Message[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usertypeService: UsertypeServiceService,
    private sharedService: SharedService) { }

  updateUserTypeName(id: string, newName: string): void {
    this.usertypeService.updateUserTypeName(id, newName).subscribe(
      response => {
        console.log("Nombre actualizado: " + response);
        this.router.navigate(['/userTypes']);
      },
      error => {
        
        console.error(error, "errrorrrrrr");
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'This user type name already exists'}];
      }
    );
    
  }

  ngOnInit(): void {
    this.usertypeService.getUserTypeData().subscribe(userType => {
      this.userType = userType;
      console.log("Editando perfil", userType.id, userType.type);
    });
  }

}
