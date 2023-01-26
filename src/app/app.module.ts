import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { ElishCustomMaterialModule } from './shared/elish.material.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

// firebase modules
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireModule } from '@angular/fire';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
//import { AuthModule } from '@angular/fire/auth';
import  firebase  from 'firebase/compat/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardHeaderComponent } from './shared/header/dash.header.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutusComponent } from './aboutus/aboutus.component';

import { HelpdeskComponent } from './shared/helpdesk/helpdesk.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard.admin.service';

// admin pages
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/login/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin.login.component';
import { SetProductComponent } from './admin/setproduct.component';

// customer pages
import { ShoppingComponent } from './shop/shopping.component';

import { FileUploadComponent } from './shared/dropzone/fileupload.component';
import { DropZoneDirective } from './shared/dropzone/dropzone.directive';
import { FileSizePipe } from './shared/dropzone/filesize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DashboardHeaderComponent,
    HeaderComponent,
    AboutusComponent,
    HelpdeskComponent,
    LoginComponent,
    SignupComponent,
    SettingsComponent,
    AdminComponent,
    AdminLoginComponent,
    SetProductComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
    ShoppingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ElishCustomMaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Online-Shop-eCommerce'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    //AuthModule, // imports firebase/auth, only needed for auth features
    AngularFireAuthModule,
    //StorageModule,
    AngularFireStorageModule, 
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService, AuthGuardAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }