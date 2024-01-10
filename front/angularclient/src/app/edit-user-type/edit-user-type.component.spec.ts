import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserTypeComponent } from './edit-user-type.component';

describe('EditUserTypeComponent', () => {
  let component: EditUserTypeComponent;
  let fixture: ComponentFixture<EditUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
