import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService, ToastService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _auth: AuthService,
    private toast: ToastService
  ) {
    let currentUser = this._auth.user;

    if (currentUser) {
      // if user is loged in and not verified
      // redirect to verify-user page
      if (!currentUser.isVerified) {
        this.router.navigate(['/verify-account']);

      } else {
        // redirect to home if already logged in and Verified
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    // // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this._auth
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        res => {
          if (!res.isVerified) {
            this.router.navigate(['/verify-account']);
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          this.toast.error(err, true);
          this.loading = false;
        }
      );
  }

  clickProvider(providerName: String): void {
    console.log('facebook login');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
