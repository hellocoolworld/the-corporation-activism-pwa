import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../../_services';
import { UserAccountModel } from './user-account.model';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: [
    './styles/user-account.page.scss'
  ],
})
export class UserAccountPage implements OnInit {
  profile: UserAccountModel;
  userAccountForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private _toast: ToastService) {}

  ngOnInit() {
    this.userAccountForm = this.fb.group(
      {
        displayName: ['', []],
        testimonial: ['', []]
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
