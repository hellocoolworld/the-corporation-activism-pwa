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

  // FACEBOOK LOGIN
  fbLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(newUserCredential => {
        this.currUser = newUserCredential;
        const email = newUserCredential.user.providerData[0].email;
        const name = newUserCredential.user.displayName;
        const photo = newUserCredential.user.photoURL + '?height=200';
        const phone = newUserCredential.user.phoneNumber;
        const uid = newUserCredential.user.uid;
        const provider = 'facebook';

        return this.firestore.doc(`/userProfile/${newUserCredential.user.uid}`)
          .update({ email, name, photo, phone, uid, provider })
          .then(() => {

          })
          .catch((error) => {
            console.log(error)
            return this.firestore.doc(`/userProfile/${newUserCredential.user.uid}`)
              .set({ email, name, photo, phone, uid, provider })
          });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  // GOOGLE LOGIN
  googleLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(newUserCredential => {
        this.currUser = newUserCredential;
        const email = newUserCredential.user.providerData[0].email;
        const name = newUserCredential.user.displayName;
        const photo = newUserCredential.user.photoURL;
        const phone = newUserCredential.user.phoneNumber;
        const uid = newUserCredential.user.uid;
        const provider = 'google';
        return this.firestore.doc(`/userProfile/${newUserCredential.user.uid}`)
          .update({ email, name, photo, phone, uid, provider })
          .then(() => {
          })
          .catch((error) => {
            console.log(error)
            return this.firestore.doc(`/userProfile/${newUserCredential.user.uid}`)
              .set({ email, name, photo, phone, uid, provider })
          });

      });

  }



  // USER PROFILE
  getUserProfile() {
    return this.itemDoc = this.firestore.doc<any>(`/userProfile/` + this.userId);
  }

  // LOGOUT
  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
