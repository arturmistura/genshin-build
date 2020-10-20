import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefactSetDetailComponent } from './artefact-set-detail.component';

describe('ArtefactSetDetailComponent', () => {
  let component: ArtefactSetDetailComponent;
  let fixture: ComponentFixture<ArtefactSetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtefactSetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefactSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
