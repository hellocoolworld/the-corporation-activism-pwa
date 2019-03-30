import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(private router: Router, private auth: AuthService) {
    this.loginForm = new FormGroup({
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

  clickSignIn(email: String, password: String): void {
    this.auth.signIn(email, password).then((val) => {

    }).catch((err) => {
      console.log('err');
    });
  }


  clickProvider(providerName: String): void {
    console.log('facebook login');
  }
}


  // public loginDiv: boolean;
  // public profileDiv: boolean;
  // public verifyDiv: boolean;
  // public options: ShareOptions;

  // constructor(
  //   private alertCtrl: AlertController,
  //   private authService: AuthService,
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
  //       text: 'A fully functional Ionic 4 PWA apps, complete with authentication system, and also CRUD samples using both Firebase Realtime Database and Firestore.',
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

  // async errorMsg(err) {
  //   //const toast = await this.toastController.create({
  //   //  message: err + '. Please try using another mobile browser',
  //   //  duration: 2000,
  //   //  position: 'top',
  //   //  color: 'primary',
  //   //  showCloseButton: true,
  //   //  closeButtonText: 'Done'
  //   //});
  //   //toast.present();
  // }


 

  // // Google Login
  // async loginGoogle(): Promise<void> {
  //   this.verifyDiv = true;
  //   this.loginDiv = false
  //   try {
  //     await this.authService.googleLogin();
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
  //   this.authService.fbLogin()
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
  //   this.authService.getUserProfile()
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
  //   this.authService.logoutUser().then(() => {
  //     this.userProfile = null;
  //     this.storage.set('user', null);
  //   });
  // }

  // async visit(url): Promise<any> {
  //   await Browser.open({ url: url });
  // }
