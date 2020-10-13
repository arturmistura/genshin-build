import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefactBuilderComponent } from './artefact-builder.component';

describe('ArtefactBuilderComponent', () => {
  let component: ArtefactBuilderComponent;
  let fixture: ComponentFixture<ArtefactBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtefactBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefactBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
