import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Plugins, ShareOptions } from '@capacitor/core';

const { Share } = Plugins;
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public userProfile: any;

  public JoinTheCrowedBlock: boolean;
  public options: ShareOptions;

  sliderConfig = {
    spacebetween: 10,
    centeredSlides: true,
    slidesPerView: 2.6
  };
  public recentStories = [
    {
      id: 1,
      image: 'https://placeimg.com/640/480/any',
      title: 'How do we empower People to fight',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 2,
      image: 'https://placeimg.com/640/480/animals',
      title: 'The corporation 2 is Coming',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 3,
      image: 'https://placeimg.com/640/480/arch',
      title: 'The corporation Changed my life',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 4,
      image: 'https://placeimg.com/640/480/people',
      title: 'How do we empower People to fight',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 5,
      image: 'https://placeimg.com/640/480/tech',
      title: 'The corporation 2 is Coming',
      link: 'How-do-we-empower-People-to-fight'
    }
  ];


  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    // check if login
    this.storage.get('user').then(val => {
      if (val == null) {
        // not login
        this.JoinTheCrowedBlock = true;
      } else {
        // login
        this.userProfile = val;
        this.JoinTheCrowedBlock = false;
      }
    });

    Share.share(this.options).catch(err => {
      // document.getElementById("fab").style.display = "none";
      console.log('ERROR ' + err);
    });
  }

  signUp() {
    this.router.navigate(['signup']);
  }
  // Share
  // please change the text and url
  async share(): Promise<any> {
    let ok = false;
    try {
      await Share.share({
        title: 'Ionic 4 PWA with Firebase and Capacitor',
        text:
          'A fully functional Ionic 4 PWA apps, complete with authentication system, and also CRUD samples using both Firebase Realtime Database and Firestore.',
        url: 'https://tabsmenu-pwa.firebaseapp.com',
        dialogTitle: 'Share with your friends'
      });
      ok = true;
    } catch (error) {
      if (ok == false) {
        console.log('ERROR ' + error);
        // this.errorMsg(error);
      }
    }
  }

  async errorMsg(err) {
    // const toast = await this.toastController.create({
    //  message: err + '. Please try using another mobile browser',
    //  duration: 2000,
    //  position: 'top',
    //  color: 'primary',
    //  showCloseButton: true,
    //  closeButtonText: 'Done'
    // });
    // toast.present();
  }

  // Get User Profile
  // async getProfile() {
  //   this.authService
  //     .getUserProfile()
  //     .get()
  //     .subscribe(user => {
  //       this.userProfile = user.data();
  //       this.storage.set('user', this.userProfile);
  //       this.JoinTheCrowedBlock = false;
  //     });
  // }

  // async visit(url): Promise<any> {
  //   await Browser.open({ url: url });
  // }
}
