import { Component, OnInit } from '@angular/core';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  isDesktop:boolean;
  constructor(private screenService: ScreenService) { }

  ngOnInit() {
    this.screenService.isDesktopView().subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
  }

}
