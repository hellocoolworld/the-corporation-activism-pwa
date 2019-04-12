import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./styles/profile.page.scss']
})
export class ProfilePage implements OnInit {
  profile: User = new User();


  constructor(private route: ActivatedRoute, private _user: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this._user.getById(params.get('id'))
        .subscribe((user: User) => {
          if (user) {
            this.profile =  user;
          }
      });
    });
  }
}
