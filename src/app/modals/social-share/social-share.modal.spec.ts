import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialShareModal } from './social-share.modal';

describe('SocialShareModal', () => {
  let component: SocialShareModal;
  let fixture: ComponentFixture<SocialShareModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialShareModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialShareModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
