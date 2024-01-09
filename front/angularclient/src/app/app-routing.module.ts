import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../app/user-list/user-list.component';
import { UserFormComponent } from '../app/user-form/user-form.component';
import { UsertypeListComponent } from './usertype-list/usertype-list.component';
import { UsertypeFormComponent } from './usertype-form/usertype-form.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'userTypes', component: UsertypeListComponent},
  {path: 'adduser', component: UserFormComponent},
  {path: 'adduserType', component: UsertypeFormComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
