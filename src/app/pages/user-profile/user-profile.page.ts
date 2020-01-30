import { Component, OnInit, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService, AuthService, UserService } from '../../services';
import { IUser } from '../../models';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  UserProfileForm: FormGroup;
  user: IUser;

  
  constructor(
    private title: Title,
    private router: Router, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private _user: UserService,
    private toast: ToastService) {

    this.setUser();
  }

  async setUser() {
    this.user = await this.authService.getUser();
    if (this.user) {
      // if user is loged in and not verified
      // redirect to verify-user page
      if (!this.user.isVerified) {
        this.router.navigate(['/verify-account']);
      } else {
        this.title.setTitle(`Halo Tales - ${this.user.displayName}`);
      }
    } else {
      // if not logged in, redirect to login
      this.router.navigate(['/login']); 
    }
  }
  ngOnInit() {
    this.UserProfileForm = this.fb.group(
      {
        displayName: [this.user.displayName, [Validators.required]],
        testimonial: [this.user.testimonial, []]
      }
    );

  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.UserProfileForm.invalid) {
      return;
    }

    // Set the new fields values into the current user opject
    this.user.displayName = this.form.displayName.value;
    this.user.testimonial = this.form.testimonial.value;

    await this._user.update(this.user)
      .pipe(first())
      .subscribe(
        res => {
          this.toast.success('Public Profile Updated Succesfully', false, 2000);
          // this.router.navigate([`/profile/${this.user.uid}`]);
          this.router.navigate([`/`]);
          },
        err => {
          console.log('err')
            this.toast.error(err, true);
        }
      );
  }

  openUploader() {
    console.log('noop');
  }
  // convenience getter for easy access to form fields
  get form() {
    return this.UserProfileForm.controls;
  }}
