import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserAccountModel } from './user-account.model';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: [
    './styles/user-account.page.scss',
    './styles/user-account.shell.scss',
    './styles/user-account.ios.scss',
    './styles/user-account.md.scss'
  ],
})
export class UserAccountPage implements OnInit {
  profile: UserAccountModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.profile && this.profile.isShell) ? true : false;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }
}
