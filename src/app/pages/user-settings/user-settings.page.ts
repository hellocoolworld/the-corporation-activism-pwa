import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { MustMatch } from '../../validators/must-match.validator';
import { ToastService, AuthService, UserService } from '../../services';
import { User } from '../../models';
import { PrivacyPolicyPage, TermsOfServicePage } from '../../modals';

import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  UserSettingsForm: FormGroup;
  currentUser: User;

  
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private _auth: AuthService,
    private toast: ToastService,
    private _user: UserService,
    private modalController: ModalController) {
      
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
    this.UserSettingsForm = this.fb.group(
      {
        email: [this.currentUser.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(5)]],
        confirmPassword: ['', ]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

  }

  onToggleChange () {
    this._user.update(this.currentUser).subscribe(
      res => {
        //Do nothing if success
        },
      err => {
        console.log('err')
          this.toast.error(err, true);
      }
    );
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.UserSettingsForm.invalid) {
      return;
    }

    // Set the new fields values into the current user opject
    this.currentUser.email = this.f.email.value;
    if (this.f.password.value !== "") {
      this.currentUser.password = this.f.password.value;
    }

    await this._user.update(this.currentUser)
      .pipe(first())
      .subscribe(
        res => {
          this.toast.success('Account Setting updated Succesfully', false, 2000);
//          this.router.navigate(['/user/profile']);
          },
        err => {
          console.log('err')
            this.toast.error(err, true);
        }
      );
  }


  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.UserSettingsForm.controls;
  }}
