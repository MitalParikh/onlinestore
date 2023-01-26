import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'dash-header',
  templateUrl: 'dash.header.component.html'
})
export class DashboardHeaderComponent implements OnInit, OnChanges {
  @Input() imageUrl: string;
  @Input() pageTitle: string;
  @Input() helpType: string;
  @Input() counter=0;
  emailSent = false;
  selectedValue;
  formShowing = false;
  configData;
  data: Observable<any>;
  

  userLoggedInColor = "warn";

  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;

  constructor(private _backendService: FirebaseService, private _router: Router) {
  }

  ngOnInit(){
    this.configData = this._backendService.getConfig();
    this.userLoggedInColor = (window.localStorage.getItem("email")) ? "primary" : "warn";
    //this.getCartSUM();
  }

  ngOnChanges(changes: SimpleChanges) {
	const log: string[] = [];
	for (const propName in changes) {
		if(propName == "counter") {
			const changedProp = changes[propName];
			log.push("flag: previous: " + changedProp.previousValue + " current: " + changedProp.currentValue); }	
	}
	console.log(log.join(', '));
  }

  onSubmit(formData) {
    this.dataLoading = true;
    //console.log(formData);
    this._backendService.sendEmail(formData).subscribe(
      res => {
        //console.log(res);
      },
      error => {
        //console.log(error);
        console.log("API didn't respond.");
        this.brokenNetwork = true;
        this.dataLoading = false;
      },
      () => {
        this.dataLoading = false;
        this.emailSent = true;
      }
    )
  }

  getCartSUM(){
	console.log("email: " + window.localStorage.getItem("email"));
    if(window.localStorage.getItem("email")){
      this._backendService.getCart('cart').subscribe((res) => {
        this.counter = 0;
        for(let i = 0; i < res.length; i++) {
          this.counter = this.counter + res[i]['qty'];
        }
        return this.counter;
      });
    }
  }

  routeDashboard(){
    if (confirm("Are you sure want to exit this app and go back to dashboard ?")) {
    this._router.navigateByUrl('alivetracking.firebaseapp.com');
      }
  }
}