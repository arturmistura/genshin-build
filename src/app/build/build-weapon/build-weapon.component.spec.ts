import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildWeaponComponent } from './build-weapon.component';

describe('BuildWeaponComponent', () => {
  let component: BuildWeaponComponent;
  let fixture: ComponentFixture<BuildWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
