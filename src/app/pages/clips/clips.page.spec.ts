import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClipsPage } from './clips.page';

describe('ClipsPage', () => {
  let component: ClipsPage;
  let fixture: ComponentFixture<ClipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
