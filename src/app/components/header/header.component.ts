import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../models';
import { UserService, AuthService } from '../../services';

@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: IUser;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private _user: UserService
  ) {
    //this.authService.user
    //  .pipe(takeUntil(this.unsubscribe$))
    //  .subscribe(res => this.user = res);
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
