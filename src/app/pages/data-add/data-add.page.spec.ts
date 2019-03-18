import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddPage } from './data-add.page';

describe('DataAddPage', () => {
  let component: DataAddPage;
  let fixture: ComponentFixture<DataAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
