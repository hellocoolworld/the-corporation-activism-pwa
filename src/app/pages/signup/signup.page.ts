import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services';
import { PrivacyPolicyModal, TermsOfServiceModal } from '../../modals';
import { Extender, SocialAuthProvider } from '../../helpers';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends Extender implements OnInit {

  public provider = SocialAuthProvider;
  public signupForm: FormGroup;
  public loading: boolean = false;

  constructor(
    protected injector: Injector,
    private fb: FormBuilder,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    super(injector);
  }

  async noUser() {
    const user: User = await this.authService.getUser();
    return user ? false : true;
  }

  ngOnInit() {
    if (this.noUser()) {
      this.signupForm = this.fb.group({
        'email': ['', [
          Validators.required,
          Validators.email
        ]],
        'password': ['', [
          Validators.required,
          Validators.minLength(5)
        ]]
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.register('', this.f.email.value, this.f.password.value)
      .then(this.successPromise)
      .catch((err) => this.failPromise(err));
  }

  /** send verification email to the users email and navigate to verify page */
  private successPromise = () => {
    this.loading = false;
    this.authService.sendEmailVerification();
    this.router.navigate(['/verify-account']);
  };

  private failPromise = (err: any) => {
    this.loading = false;
    this.toast(err);
  };



  


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
  get f() { return this.signupForm.controls; }
}
