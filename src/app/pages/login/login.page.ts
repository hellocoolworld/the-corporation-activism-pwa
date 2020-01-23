import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService, ToastService } from '../../services';
import { User } from 'src/app/models';
import { SignupPage } from '../signup/signup.page';

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
    private authService: AuthService,
    private toast: ToastService
  ) {

  }

  async ngOnInit() {
    const user: User = await this.authService.getUser();
    if (user) {
      // if user is loged in and not verified
      // redirect to verify-user page
      if (!user.isVerified) {
        this.router.navigate(['/verify-account']);
      } else {
        // redirect to home if already logged in and Verified
        this.router.navigate(['/']);
      }
    }

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
    this.authService
      .signIn(this.f.email.value, this.f.password.value)
      .then((res) => {
        console.log('res: ', res);
        this.onSignIn();
      })
      .catch((err) => {
        this.toast.error(err, true);
        this.loading = false;
      });
  }

  async onSignIn() {
    const user: User = await this.authService.getUser();
    if (!user.isVerified) {
      this.router.navigate(['/verify-account']);
    } else {
      this.router.navigate([this.returnUrl]);
    }
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
