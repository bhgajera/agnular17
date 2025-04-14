import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAComponent } from './dialog-a/dialog-a.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CustomDialogRef } from './services/custom.dialog.ref';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentRegisteryModule } from './registred-components/component-registry.module';
import {MatIconModule} from '@angular/material/icon';
import { PlrPageLayoutComponent } from './page-layout/page-layout.component';
import { WpcPageLayoutComponent } from './main-page-layout/main-page-layout.component';
import { AttachmentListComponent } from './attachment-list/attachment-list.component';
import { CustomTemplateDirective } from './directives/custom-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    DialogAComponent,
    DialogContentComponent,
    UserListComponent,
    DashboardComponent,
    PlrPageLayoutComponent,
    WpcPageLayoutComponent,
    AttachmentListComponent,
    CustomTemplateDirective
  ],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatBottomSheetModule,
    FormsModule,
    ComponentRegisteryModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
