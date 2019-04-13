import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})

export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onSubmit() {
    this._toast.info('An email with a link to reset your password has been sent to you. Please check your email.', true, 2000);
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

}
