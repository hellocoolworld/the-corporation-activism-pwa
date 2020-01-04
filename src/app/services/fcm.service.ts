import { Injectable, Injector } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import * as app from 'firebase/app';
import { tap } from 'rxjs/internal/operators';
import { AuthService } from 'src/pages/auth/services/auth/auth.service';
import { Extender } from 'src/shared/helpers/extender';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService extends Extender {
  constructor(
    protected injector: Injector,
    private firebaseNative: FirebaseX,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private platform: Platform,
    private afMessaging: AngularFireMessaging
  ) {
    super(injector);
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) {}
  }

  // Get permission from the user
  public async getToken() {
    let token: string;
    if ((window as any).cordova) {
      if (this.platform.is('android')) {
        token = await this.firebaseNative.getToken();
        console.log('android', token);
      }

      if (this.platform.is('ios')) {
        token = await this.firebaseNative.getToken();
        console.log('android', token);
        await this.firebaseNative.grantPermission();
      }
      return this.saveTokenToFirestore(token);
    } else {
      this.afMessaging.requestPermission.subscribe();
      return this.afMessaging.requestToken.subscribe((_token) => {
        token = _token;
        return this.saveTokenToFirestore(token);
      });
    }
  }

  // Listen to incoming FCM messages
  public listenToNotifications() {
    if ((window as any).cordova) {
      return this.firebaseNative.onMessageReceived();
    } else {
      return this.afMessaging.messages.pipe(
        tap((msg) => {
          const body: any = (msg as any).notification.body;
          this.toast(body);
        })
      );
    }
  }

  // Save the token to firestore
  private async saveTokenToFirestore(token: string) {
    const { uid } = await this.authService.getUser();
    if (!token) {
      return;
    }

    if (uid) {
      const docData = {
        token,
        uid
      };

      return this.firestoreService.set(`fcm-devices/${token}`, docData);
    }
  }
}
