import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditPage } from './data-edit.page';

describe('DataEditPage', () => {
  let component: DataEditPage;
  let fixture: ComponentFixture<DataEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
