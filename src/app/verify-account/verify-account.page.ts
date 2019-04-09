import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService, ToastService } from '../_services';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit {
  verifyForm: FormGroup;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService
    ) {
    }
 
  ngOnInit() {
    this.verifyForm = this.fb.group({
      'verificationCode': ['', [
        Validators.required,
        Validators.pattern('^[0-9+-]+$'),
        Validators.minLength(4)
      ]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this._toast.success('Account Verified Succesfully', true);
          this.router.navigate([this.returnUrl]);
          },
        err => {
            this._toast.error(err, true);
        }
      );
  }


  // convenience getter for easy access to form fields
  get f() { return this.verifyForm.controls; }

}
