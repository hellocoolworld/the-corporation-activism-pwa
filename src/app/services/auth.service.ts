import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  public currUser: any;
  public userProfile: AngularFirestoreDocument<any>;
  public userId: any;

  private itemDoc: AngularFirestoreDocument<any>;
  private itemList: AngularFirestoreCollection<any>;

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.currUser = user;
        this.userId = user.uid;
      } else {
        this.currUser = null;
        this.userId = null;
      }
    });
  }
  signUp(email: String, password: String): Promise<any> {}

  signIn(
    
  ): Promise<any> {}

  forgetPassword(): Promize<any> {}

  socialSignOn () {}

  socialSignOut () {}

  // USER PROFILE
  getUserProfile() {
    return (this.itemDoc = this.firestore.doc<any>(
      `/userProfile/` + this.userId
    ));
  }

  // LOGOUT
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
