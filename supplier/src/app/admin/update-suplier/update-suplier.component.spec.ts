import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuplierComponent } from './update-suplier.component';

describe('UpdateSuplierComponent', () => {
  let component: UpdateSuplierComponent;
  let fixture: ComponentFixture<UpdateSuplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSuplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
