import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let platformReadySpy, platformSpy;

  beforeEach(async(() => {
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ZXingScannerModule.forRoot()
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  it('should render zxing-scanner tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('zxing-scanner')).toBeTruthy();
  }));
  // TODO: add more tests!

});
