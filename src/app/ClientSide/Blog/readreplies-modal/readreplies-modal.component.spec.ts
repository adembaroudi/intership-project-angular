import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadrepliesModalComponent } from './readreplies-modal.component';

describe('ReadrepliesModalComponent', () => {
  let component: ReadrepliesModalComponent;
  let fixture: ComponentFixture<ReadrepliesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadrepliesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadrepliesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
