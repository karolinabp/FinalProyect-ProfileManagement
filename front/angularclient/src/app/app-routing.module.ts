import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../app/user-list/user-list.component';
import { UserFormComponent } from '../app/user-form/user-form.component';
import { UsertypeListComponent } from './usertype-list/usertype-list.component';
import { UsertypeFormComponent } from './usertype-form/usertype-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserTypeComponent } from './edit-user-type/edit-user-type.component';

const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'userTypes', component: UsertypeListComponent},
  {path: 'adduser', component: UserFormComponent},
  {path: 'adduserType', component: UsertypeFormComponent},
  {path: 'editUser', component: EditUserComponent},
  {path: 'editUserType', component: EditUserTypeComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
