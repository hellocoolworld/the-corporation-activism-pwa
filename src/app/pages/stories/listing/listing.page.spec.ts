import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingPage } from './listing.page';

describe('ListingPage', () => {
  let component: ListingPage;
  let fixture: ComponentFixture<ListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
