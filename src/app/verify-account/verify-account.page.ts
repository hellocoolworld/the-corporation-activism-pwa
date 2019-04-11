import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService, ToastService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit {
  verifyForm: FormGroup;
  currentUser: User;
  returnUrl: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService
    ) {
      this.currentUser = this._auth.currentUserValue;
      if (!this.currentUser) {
        // if user is not logged in forward to login page
        this.router.navigate(['login']); 
        return;
      }  
    }
 
  ngOnInit() {
    this.verifyForm = this.fb.group({
      'verificationCode': ['', [
        Validators.required,
        Validators.pattern('^[0-9+-]+$'),
        Validators.minLength(4)
      ]]
    });
  }


  async onSubmit() {
    // stop here if form is invalid
    if (this.verifyForm.invalid) {
      return;
    }

    this._auth.verify(this._auth.currentUserValue.id, this.f.verificationCode.value)
      .pipe(first())
      .subscribe(
        res => {
          this._toast.success('Account Verified Succesfully', false, 1000);
          this.router.navigate(['/user/profile']);
          },
        err => {
            this._toast.error(err, true);
        }
      );
  }


  // convenience getter for easy access to form fields
  get f() { return this.verifyForm.controls; }

}
