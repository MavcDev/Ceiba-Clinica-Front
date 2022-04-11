import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MessageBoxComponent } from './message-box.component';

describe('MessageBoxComponent', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida abrir mensaje box', () => {
    const ngbModal: NgbModal = TestBed.inject(NgbModal);
    spyOn(ngbModal, 'open').and.callThrough();
    fixture.detectChanges();

    component.open('Información', 'Mensaje prueba');

    expect(ngbModal.open).toHaveBeenCalled();
  });
});
