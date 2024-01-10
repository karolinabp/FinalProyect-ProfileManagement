import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  /** Injecting the data to show the user properties */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
   }


}
