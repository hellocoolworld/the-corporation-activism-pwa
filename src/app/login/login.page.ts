import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService, ToastService } from '../_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
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
    private _toast: ToastService
    ) {
      // redirect to home if already logged in
      if (this._auth.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const credentials = this.loginForm.value;

    this._auth.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        res => {
          this.router.navigate([this.returnUrl]);
          },
        err => {
            this._toast.error(err, true);
            this.loading = false;
        }
      );
  }


  clickProvider(providerName: String): void {
    console.log('facebook login');
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

}


  // public loginDiv: boolean;
  // public profileDiv: boolean;
  // public verifyDiv: boolean;
  // public options: ShareOptions;

  // constructor(
  //   private alertCtrl: AlertController,
  //   private _authService: AuthService,
  //   private storage: Storage,
  // ) {

  // }

  // ionViewWillEnter() {

  // }

  // ngOnInit() {
  //   // check if login
  //   this.storage.get('user').then((val) => {
  //     if (val == null) {
  //       // not login
  //       this.loginDiv = true
  //     } else {
  //       // login
  //       this.userProfile = val
  //       this.loginDiv = false;
  //       this.profileDiv = true;
  //     }
  //   });

  //   Share.share(this.options).catch(err => {
  //     document.getElementById("fab").style.display = "none";
  //     console.log("ERROR " + err);
  //   });


  // }


  // // Share
  // // please change the text and url
  // async share(): Promise<any> {
  //   let ok = false;
  //   try {
  //     await Share.share({
  //       title: 'Ionic 4 PWA with Firebase and Capacitor',
  //       text: 'A fully functional Ionic 4 PWA apps, complete with _authentication system, and also CRUD samples using both Firebase Realtime Database and Firestore.',
  //       url: 'https://tabsmenu-pwa.firebaseapp.com',
  //       dialogTitle: 'Share with your friends'
  //     });
  //     ok = true;
  //   } catch (error) {
  //     if (ok == false) {
  //       console.log('ERROR ' + error);
  //       // this.errorMsg(error);
  //     }
  //   };
  // }





  // // Google Login
  // async loginGoogle(): Promise<void> {
  //   this.verifyDiv = true;
  //   this.loginDiv = false
  //   try {
  //     await this._authService.googleLogin();
  //     this.getProfile();
  //   } catch (error) {
  //     this.verifyDiv = false;
  //     this.loginDiv = true;
  //     console.log(error.message)
  //   };
  // }

  // // Facebook Login
  // async loginFacebook(): Promise<void> {
  //   this.verifyDiv = true;
  //   this.loginDiv = false;
  //   this._authService.fbLogin()
  //     .then(user => {
  //       if (user == undefined) {
  //         this.duplicateAcct()
  //       } else {
  //         this.getProfile();
  //       }
  //     })
  // }

  // // User already sign-up using Google
  // async duplicateAcct() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Duplicate Account',
  //     subHeader: 'You have already signed-up using Google',
  //     message: 'Please use Google to login',
  //     backdropDismiss: false,
  //     buttons: [
  //       {
  //         text: 'Login with Google',
  //         handler: () => {
  //           this.loginGoogle();
  //         }
  //       }
  //     ]

  //   });
  //   await alert.present();
  // }

  // // Get User Profile
  // async getProfile() {
  //   this._authService.getUserProfile()
  //     .get()
  //     .subscribe(user => {
  //       this.userProfile = user.data();
  //       this.storage.set('user', this.userProfile);
  //       this.loginDiv = false;
  //       this.profileDiv = true;
  //       this.verifyDiv = false;
  //     })
  // }

  // // Logout
  // logOut(): void {
  //   this.loginDiv = true;
  //   this.profileDiv = false;
  //   this._authService.logoutUser().then(() => {
  //     this.userProfile = null;
  //     this.storage.set('user', null);
  //   });
  // }

  // async visit(url): Promise<any> {
  //   await Browser.open({ url: url });
  // }
