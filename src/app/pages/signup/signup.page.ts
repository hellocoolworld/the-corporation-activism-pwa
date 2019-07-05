import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable-next-line: no-unused-expression
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { first } from 'rxjs/operators';

import { AuthService, UserService, ToastService } from '../../services';
import { PrivacyPolicyModal, TermsOfServiceModal } from '../../modals';

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
    private toast: ToastService,
    private modalController: ModalController
  ) {
      // redirect to home if already logged in
      if (this._auth.currentUserValue) {
        this.router.navigate(['/']);
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
            this.toast.success('Registration successful. Check your inbox for verification code', true);
            // automatically authenticate the user
            this._auth.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
              data => {
                // Redirect user to the verification page.
                this.router.navigate(['/verify-account']);
                },
              err => {
                  this.toast.error(err, true);
              }
            );
          },
          err => {
            this.toast.error(err, true);
          });

    } catch (err) {
      this.toast.error(err, true);
    }
  }

  clickProvider(providerName: String): void {
    console.log('facebook login');
  }


  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServiceModal
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyModal
    });
    return await modal.present();
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }
}
