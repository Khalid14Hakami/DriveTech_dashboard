import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewStorageComponent } from './create-new-storage.component';

describe('CreateNewStorageComponent', () => {
  let component: CreateNewStorageComponent;
  let fixture: ComponentFixture<CreateNewStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
