import { Component, Input, OnInit, OnDestroy, Injector } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../services';
import { Extender, SocialAuthProvider } from '../../helpers';


@Component({
  selector: 'social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent extends Extender implements OnInit, OnDestroy {
  user: User;
  public provider = SocialAuthProvider;
  @Input() state:string;
  
  constructor(protected injector: Injector, private authService: AuthService) {
    super(injector);
  }
  async ngOnInit() {
    this.user = await this.authService.getUser();
  }               
  /** users facebook or google social to login based on provider type
   * on success, navigate to dashboard page
   */
  public socialLoginIn(provider: number) {
    console.log('provider: ', provider);
    this.authService
      .sociaLogin(provider)
      .then(() => {
        this.goto('/user');
      })
      .catch((err) => this.failPromise(err))
      .finally(()=>{
        this.loading = false;
      });
  }

  private successPromise = () => {
    
  };

  private failPromise = (err: any) => {
    this.toast(err);
  };
  ngOnDestroy() {
  
  }

}
