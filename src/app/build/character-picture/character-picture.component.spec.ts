import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPictureComponent } from './character-picture.component';

describe('CharacterPictureComponent', () => {
  let component: CharacterPictureComponent;
  let fixture: ComponentFixture<CharacterPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
