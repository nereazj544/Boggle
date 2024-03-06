import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoggleComponent } from './boggle.component';

describe('BoggleComponent', () => {
  let component: BoggleComponent;
  let fixture: ComponentFixture<BoggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
