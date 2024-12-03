import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoGridComponent } from './repo-grid.component';

describe('RepoGridComponent', () => {
  let component: RepoGridComponent;
  let fixture: ComponentFixture<RepoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
