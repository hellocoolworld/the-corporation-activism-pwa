import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { first } from 'rxjs/operators';

import { AuthService, UserService, ToastService } from '../_services';
import { PrivacyPolicyPage, TermsOfServicePage } from '../_modals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _user: UserService,
    private _toast: ToastService,
    private modalController: ModalController
  ) {
      // redirect to home if already logged in
      if (this._auth.currentUserValue) {
        this.router.navigate(['/home']);
      }
}

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    try {
      await this._user.register(this.signupForm.value)
        .pipe(first())
        .subscribe (
          res => {
            this._toast.success('Registration successful. Check your inbox for verification code', true);
            // automatically authenticate the user
            this._auth.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
              data => {
                // Redirect user to the verification page.
                this.router.navigate(['/verify-account']);
                },
              err => {
                  this._toast.error(err, true);
              }
            );
          },
          err => {
            this._toast.error(err, true);
          });

    } catch (err) {
      this._toast.error(err, true);
    }
  }

  socialProviderSingup(provider: String): void {
    console.log('facebook signup');
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
  get f() { return this.signupForm.controls; }
}
