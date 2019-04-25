import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Story, StoryType } from '../_models';
import { AuthService, StoryService } from '../_services';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  currentUser: User;
  stories: Story[] = [];

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _story: StoryService
  ) {
    this.currentUser = this._auth.currentUserValue;
  }

  ngOnInit() {
    this._story.getAll().subscribe(
      result => {
        let data = result as Story[]; //Convert the result to an array of Stories
        for (var i=0; i<data.length; i++) {
          this.stories.push(data[i]);
        }
      },
      error => { 
        console.log("Error in recieving data"); 
      },
      ()   => {
        // console.log( this.stories );
      }
    );
  }

  pledgesCount():number {
    return this.currentUser.pledges.length;
  }
  storiesCount():number {
    return this.currentUser.stories.length;
  }


  signUp() {
    this.router.navigate(['signup']);
  }


}
