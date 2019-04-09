import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService, AuthService } from '../../_services';
import { User } from '../../_models';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: [
    './styles/user-account.page.scss'
  ],
})
export class UserAccountPage implements OnInit {
  userAccountForm: FormGroup;
  currentUser: User;

  
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private _auth: AuthService,
    private _toast: ToastService) {
      
    this.currentUser = this._auth.currentUserValue;
    if (this.currentUser) {
      // if user is loged in and not verified
      // redirect to verify-user page
      if (!this.currentUser.isVerified) {
        this.router.navigate(['/verify-account']);
      }
    } else {
      // if not logged in, redirect to login
      this.router.navigate(['login']); 
    }
  }

  ngOnInit() {

    
    this.userAccountForm = this.fb.group(
      {
        displayName: [this.currentUser.displayName, []],
        testimonial: [this.currentUser.testimonial, []]
      }
    );

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.userAccountForm.invalid) {
      return;
    }

    this._toast.success('Account updated.' + JSON.stringify(this.userAccountForm.value), false, 2000);
  }

  resize() {
    console.log(this.userAccountForm.controls.testimonial);
//    this.userAccountForm.controls.testimonial. style.height = this.userAccountForm.controls.testimonial.scrollHeight + 'px';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userAccountForm.controls;
  }}
