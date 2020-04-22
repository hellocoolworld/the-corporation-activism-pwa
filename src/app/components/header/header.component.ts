import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from 'src/app/helpers';
import { Preference } from 'src/app/models';

@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {
  
  
  constructor(
    protected injector: Injector,
    private settingsService: Preference
  ) {
    super(injector);
  }

  async ngOnInit() {
    
  }

  get showJoin() { 
    const test:boolean = !this.settingsService.hasToken();
    console.log('test: ', test);
    return test;
  }

  ngOnDestroy() {
    
  }
 
}
