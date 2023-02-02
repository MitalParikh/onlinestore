import { Component, OnInit,AfterViewInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firestore from 'firebase/compat/app';
import { environment } from '../../../environments/environment';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from "rxjs";


@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit  {
  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  isLoggedIn;
  counter = 0;

  constructor(public afAuth: AngularFireAuth, private _router: Router, private _backendService: FirebaseService) { }

  ngOnInit() {
      this.socialAuth = environment.socialAuthEnabled; // show Google and FB Sign in only when social auth is enabled
	if(this.afAuth.authState) {
	
        this.getAuthStatus();
	console.log("hi");  
      }
  }

  ngAfterViewInit(){
      
  }

  getAuthStatus(){
	
    this._backendService.redirectLogin().subscribe((result) => {
	console.log("result: " + result.uid);
      if (result.uid) {
        window.localStorage.setItem("displayName",result.displayName);
        window.localStorage.setItem("email",result.email);
        window.localStorage.setItem("picture",result.photoURL);
	  this.getCartSUM();
        this.isLoggedIn = "try this";
      }
    });/*.catch(
      (err) => {
        this.error = err;
      })*/
      
  }

  getCartSUM(){
	//console.log("email: " + window.localStorage.getItem("email"));
    //if(window.localStorage.getItem("email")){
      this._backendService.getCart('cart').subscribe((res) => {
        this.counter = 0;
	  console.log("length: " + res.length);
        for(let i = 0; i < res.length; i++) {
          this.counter = this.counter + res[i]['qty'];
        }
        return this.counter;
      });
    //}
  }

  login(loginType, formData?) {
      this._backendService.login(loginType, formData);
      /**
      .then(
        (success) => {
          if(formData) {
            window.localStorage.setItem("email",formData.email);
          }
          //console.log(success);
          this._router.navigate(['/settings']);
        }).catch(
        (err) => {
          this.error = err;
        })
      ;
       */
    }
  }
