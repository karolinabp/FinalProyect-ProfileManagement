import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UsertypeListComponent } from './usertype-list/usertype-list.component';
import { UsertypeFormComponent } from './usertype-form/usertype-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from './user-card/user-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserTypeComponent } from './edit-user-type/edit-user-type.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    UsertypeListComponent,
    UsertypeFormComponent,
    UserCardComponent,
    EditUserComponent,
    EditUserTypeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatDialogClose,
    MatMenuModule,
    MessageModule,
    MessagesModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
