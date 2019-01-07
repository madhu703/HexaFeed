import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexaPostsComponent } from './hexa-posts.component';

describe('HexaPostsComponent', () => {
  let component: HexaPostsComponent;
  let fixture: ComponentFixture<HexaPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexaPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
