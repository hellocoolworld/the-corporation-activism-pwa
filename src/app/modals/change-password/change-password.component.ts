import { Component, Injector, OnInit } from '@angular/core';
import { IUser } from 'src/pages/auth/helpers/model';
import { AuthService } from 'src/pages/auth/services/auth/auth.service';
import { Extender } from 'src/shared/helpers/extender';
import { FirestoreService } from 'src/shared/services/firestore/firestore.service';

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
  public currentUser: IUser;

  constructor(protected injector: Injector, private authService: AuthService, private firestoreService: FirestoreService) {
    super(injector);
  }

  /** get current user */
  public async ngOnInit() {
    this.currentUser = await this.authService.getUser();
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
