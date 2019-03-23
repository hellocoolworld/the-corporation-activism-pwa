import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  public appMenu = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Stories',
      url: '/stories',
      icon: 'text'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  sliderConfig = {
    spacebetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  };
  public recentStories = [
    {
      id: 1,
      image: 'https://placeimg.com/640/480/any',
      title: 'How do we empower People to fight',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 2,
      image: 'https://placeimg.com/640/480/animals',
      title: 'The corporation 2 is Coming',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 3,
      image: 'https://placeimg.com/640/480/arch',
      title: 'The corporation Changed my life',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 4,
      image: 'https://placeimg.com/640/480/people',
      title: 'How do we empower People to fight',
      link: 'How-do-we-empower-People-to-fight'
    },
    {
      id: 5,
      image: 'https://placeimg.com/640/480/tech',
      title: 'The corporation 2 is Coming',
      link: 'How-do-we-empower-People-to-fight'
    }
  ];


  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

}
