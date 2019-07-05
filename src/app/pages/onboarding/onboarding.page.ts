import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  
  onbordingOpts = {
    speed: 400,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    }
    
  };

  constructor(private router: Router, private title: Title) { 
    this.title.setTitle('Halo Tales - Tour');
  }

  ngOnInit() {
  }

  onClickContinue() {
    this.router.navigate(['/']);
  }

  slideChange(slider) {

  slider.isEnd().subscribe(
  res => {console.log('here', res);}
 );
    
  }
}
