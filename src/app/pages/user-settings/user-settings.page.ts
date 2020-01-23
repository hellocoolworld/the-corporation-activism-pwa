import { Component, OnInit, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { MustMatch } from '../../validators/must-match.validator';
import { ToastService, AuthService, UserService } from '../../services';
import { User } from '../../models';
import { PrivacyPolicyModal, TermsOfServiceModal } from '../../modals';

import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  UserSettingsForm: FormGroup;
  user: User;

  
  constructor(
    private title: Title,
    private router: Router, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private toast: ToastService,
    private _user: UserService,
    private modalController: ModalController) {
      
    
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
   
    this.UserSettingsForm = this.fb.group(
      {
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(5)]],
        confirmPassword: ['', ]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

  }

  onToggleChange () {
    this._user.update(this.user).subscribe(
      res => {
        //Do nothing if success
        },
      err => {
        console.log('err')
          this.toast.error(err, true);
      }
    );
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.UserSettingsForm.invalid) {
      return;
    }

    // Set the new fields values into the current user opject
    this.user.email = this.f.email.value;
    if (this.f.password.value !== "") {
      this.user.password = this.f.password.value;
    }

    await this._user.update(this.user)
      .pipe(first())
      .subscribe(
        res => {
          this.toast.success('Account Setting updated Succesfully', false, 2000);
//          this.router.navigate(['/user/profile']);
          },
        err => {
          console.log('err')
            this.toast.error(err, true);
        }
      );
  }


  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServiceModal
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyModal
    });
    return await modal.present();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.UserSettingsForm.controls;
  }}
