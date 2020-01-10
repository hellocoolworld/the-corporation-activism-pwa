import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit, OnDestroy {
  user: User;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  ngOnDestroy() {
  
  }

}
