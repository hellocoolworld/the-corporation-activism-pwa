import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService, AuthService, UserService } from '../../services';
import { User } from '../../models';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  UserProfileForm: FormGroup;
  currentUser: User;

  
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private _auth: AuthService,
    private _user: UserService,
    private toast: ToastService) {

    this.currentUser = this._auth.currentUserValue;
    if (this.currentUser) {
      // if user is loged in and not verified
      // redirect to verify-user page
      if (!this.currentUser.isVerified) {
        this.router.navigate(['/verify-account']);
      }
    } else {
      // if not logged in, redirect to login
      this.router.navigate(['/login']); 
    }
  }

  ngOnInit() {
    this.UserProfileForm = this.fb.group(
      {
        displayName: [this.currentUser.displayName, [Validators.required]],
        testimonial: [this.currentUser.testimonial, []]
      }
    );

  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.UserProfileForm.invalid) {
      return;
    }

    // Set the new fields values into the current user opject
    this.currentUser.displayName = this.f.displayName.value;
    this.currentUser.testimonial = this.f.testimonial.value;

    await this._user.update(this.currentUser)
      .pipe(first())
      .subscribe(
        res => {
          this.toast.success('Public Profile Updated Succesfully', false, 2000);
          // this.router.navigate([`/profile/${this.currentUser.id}`]);
          this.router.navigate([`/home`]);
          },
        err => {
          console.log('err')
            this.toast.error(err, true);
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.UserProfileForm.controls;
  }}
