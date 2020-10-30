import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAvocadosComponent } from './add-avocados.component';

describe('AddAvocadosComponent', () => {
  let component: AddAvocadosComponent;
  let fixture: ComponentFixture<AddAvocadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAvocadosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAvocadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
