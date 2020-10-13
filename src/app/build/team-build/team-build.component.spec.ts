import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuildComponent } from './team-build.component';

describe('TeamBuildComponent', () => {
  let component: TeamBuildComponent;
  let fixture: ComponentFixture<TeamBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
