import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: [
    'user.page.scss'
  ]
})
export class UserPage  {

  constructor(private title: Title) {
    this.title.setTitle('Halo Tales - User');
  }
  
}
