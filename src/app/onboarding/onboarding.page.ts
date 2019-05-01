import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  
  onbordingOpts = {
    speed: 400,
    grabCursor: true
    
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickContinue() {
    this.router.navigate(['/home']);
  }
}
