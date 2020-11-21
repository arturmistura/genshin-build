import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCreateComponent } from './build-create.component';

describe('BuildCreateComponent', () => {
  let component: BuildCreateComponent;
  let fixture: ComponentFixture<BuildCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
