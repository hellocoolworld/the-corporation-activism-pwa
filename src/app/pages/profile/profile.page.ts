import { Component, OnInit, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  profile: User = new User();
  profileData: String = 'testimonial';

  constructor(private activatedRoute: ActivatedRoute,
              private title: Title,
              private _user: UserService) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this._user.getById(userId)
      .subscribe((user: User) => {
        if (user) {
          this.profile = user;
          this.title.setTitle(`Halo Tales - ${this.profile.displayName}`);
        } 
    });

    // this.activatedRoute.paramMap.subscribe(params => {
    //   this._user.getById(params.get('id'))
    //     .subscribe((user: User) => {
    //       if (user) {
    //         this.profile =  user;
    //       } 
    //   });
    // });
  }
}
