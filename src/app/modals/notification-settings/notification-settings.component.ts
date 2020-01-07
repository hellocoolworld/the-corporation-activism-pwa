import { Component, Injector, OnInit } from '@angular/core';
import { IPreference } from 'src/app//models/ipreference';
import { Extender } from 'src/app/helpers/extender';
import { FirestoreService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent extends Extender implements OnInit {
  public model: IPreference = null;

  constructor(protected injector: Injector, private authService: AuthService, private firestoreService: FirestoreService) {
    super(injector);
  }

  /** get settings and current user */
  public async ngOnInit() {
    const { id } = await this.authService.getUser();
    this.firestoreService.doc$<IPreference>(`preferences/${id}`).subscribe((setting: IPreference) => (this.model = setting));
  }

  /** save preference */
  public savePreference(setting: IPreference) {
    this.firestoreService.set<IPreference>(`preferences/${this.model.uid}`, setting);
  }
}
