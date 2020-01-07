import { Component, Injector, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Extender } from 'src/app/helpers/extender';
import { FirestoreService } from 'src/app/services/firestore.service';

/** present screen to allow user to change password */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends Extender implements OnInit {
  public model: { oldPassword: string; password: string; rpassword: string } = {
    oldPassword: null,
    password: null,
    rpassword: null
  };
  public user: IUser;

  constructor(protected injector: Injector, private authService: AuthService, private firestoreService: FirestoreService) {
    super(injector);
  }

  /** get current user */
  public async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  /**
   * update user password and close modal
   */
  public changePassword() {
    this.loading = true;
    this.authService
      .updatePassword(this.model.oldPassword, this.model.password)
      .then(() => {
        this.loading = false;
        this.closeModal();
        this.toast('Password Changed');
      })
      .catch((err) => this.failPromise(err));
  }

  private failPromise = (err: any) => {
    this.loading = false;
    this.toast(err);
  };
}
