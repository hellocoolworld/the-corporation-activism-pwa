import { Injectable, Injector } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import * as app from 'firebase/app';
import { tap } from 'rxjs/internal/operators';
import { Extender } from 'src/app/helpers/extender';
import { FirestoreService } from './firestore.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService extends Extender {
  constructor(
    protected injector: Injector,
    private firebaseNative: FirebaseX,
    private firestoreService: FirestoreService,
    private platform: Platform,
    private settingsService: SettingsService,
    private afMessaging: AngularFireMessaging
  ) {
    super(injector);
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) { }
  }

  // Get permission from the user
  public async getToken() {
    let token: string;

    this.afMessaging.requestPermission.subscribe();
    return this.afMessaging.requestToken.subscribe((_token) => {
      token = _token;
      return this.saveTokenToFirestore(token);
    });

  }

  // Listen to incoming FCM messages
  public listenToNotifications() {
    return this.afMessaging.messages.pipe(
      tap((msg) => {
        const body: any = (msg as any).notification.body;
        this.toast(body);
      })
    );
  }

  // Save the token to firestore
  private async saveTokenToFirestore(token: string) {
    // const { uid } = this.settingsService.getDeviceToken();
    const uid = this.settingsService.getDeviceToken();
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