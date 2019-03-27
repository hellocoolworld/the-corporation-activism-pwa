import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./styles/signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
  ) {
    this.signupForm = new FormGroup({
      'fullname': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit() {
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

  doSignup(): void {
    console.log('do sign up');
    this.router.navigate(['app/categories']);
  }

  doFacebookSignup(): void {
    console.log('facebook signup');
    this.router.navigate(['app/categories']);
  }

  doGoogleSignup(): void {
    console.log('google signup');
    this.router.navigate(['app/categories']);
  }

  doTwitterSignup(): void {
    console.log('twitter signup');
    this.router.navigate(['app/categories']);
  }
}
