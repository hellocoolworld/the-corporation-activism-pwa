import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoriesListingComponent } from './stories-listing.component';

describe('StoriesListingComponent', () => {
  let component: StoriesListingComponent;
  let fixture: ComponentFixture<StoriesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesListingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
