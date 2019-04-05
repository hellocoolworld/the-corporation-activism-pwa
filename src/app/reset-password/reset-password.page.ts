import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MustMatch } from '../_validators/must-match.validator';
import { ToastService } from '../_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: [
    './styles/reset-password.page.scss'
  ]
})

export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      'confirmPassword': ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this._toast.success('Pssword reset.' + JSON.stringify(this.resetPasswordForm.value), false, 2000);
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

}
