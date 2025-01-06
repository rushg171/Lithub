import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposGridComponent } from './repos-grid.component';

describe('ReposGridComponent', () => {
  let component: ReposGridComponent;
  let fixture: ComponentFixture<ReposGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReposGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
