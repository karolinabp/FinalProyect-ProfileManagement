import { Component } from '@angular/core';
import { Usertype } from '../usertype';
import { Router, ActivatedRoute } from '@angular/router';
import { UsertypeServiceService } from '../../services/usertype-service.service';

@Component({
  selector: 'app-edit-user-type',
  templateUrl: './edit-user-type.component.html',
  styleUrl: './edit-user-type.component.css'
})
export class EditUserTypeComponent {

  userType: Usertype = { id: '', type: ''};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usertypeService: UsertypeServiceService) { }

  updateUserTypeName(id: string, newName: string): void {
    this.usertypeService.updateUserTypeName(id, newName).subscribe(
      response => {
        console.log("Nombre actualizado: " + response);
      },
      error => {
        console.error(error);
      }
    );
    this.router.navigate(['/userTypes']);
  }

  ngOnInit(): void {
    this.usertypeService.getUserTypeData().subscribe(userType => {
      this.userType = userType;
      console.log("Editando perfil", userType.id, userType.type);
    });
  }

}
