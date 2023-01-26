import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { FirebaseService } from './firebase.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(public afAuth: AngularFireAuth, private _backendService: FirebaseService, private router: Router) { }

  //canActivate(): { 
  //  if(localStorage.getItem('token') == "7PjNil") {
  //     return true;
  //  } else {
  //     this.router.navigate(['/login']);
  //     return false;
  // }
//}

  canActivate(): Observable<boolean> {
	console.log("Hello");
      return this._backendService.isUserAdmin()
	.pipe(map(res => {
	  if (res) {
		console.log("hello: you are here, " + res.isadmin);
	    return res.isadmin;
	  } else {
		console.log("hi: You are not authorised Admin, " + res);
	    return false;
	  }
	})
	)
  }
}