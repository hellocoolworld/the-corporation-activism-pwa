import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../models';
import { UserService, AuthService } from '../../services';
import { Extender } from 'src/app/helpers';

@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {
  
  user: IUser;

  constructor(
    protected injector: Injector,
    private authService: AuthService,
    private _user: UserService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    // this.subscriptions.push(
    //  this.authService.user
    //  .subscribe(res => this.user = res) 
    // };

  }

  get showLogin() {
    const test:boolean = !this.user && this.router.url !== '/login';
    console.log('test: ', test);
    return test;
  }

  ngOnDestroy() {
    
  }
 
}
