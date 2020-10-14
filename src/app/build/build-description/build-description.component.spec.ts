import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDescriptionComponent } from './build-description.component';

describe('BuildDescriptionComponent', () => {
  let component: BuildDescriptionComponent;
  let fixture: ComponentFixture<BuildDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
