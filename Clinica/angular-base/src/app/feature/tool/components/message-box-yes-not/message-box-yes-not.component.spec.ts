import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxYesNotComponent } from './message-box-yes-not.component';


describe('MessageBoxYesNotComponent', () => {
  let component: MessageBoxYesNotComponent;
  let fixture: ComponentFixture<MessageBoxYesNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxYesNotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBoxYesNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida abrir mensaje box de yes not', () => {
    const ngbModal: NgbModal = TestBed.inject(NgbModal);
    spyOn(ngbModal, 'open').and.callThrough();
    fixture.detectChanges();

    component.open('Información', 'Mensaje prueba');

    expect(ngbModal.open).toHaveBeenCalled();
  });

  it('Valida cuando se envia el mensaje de confirmacion', () => {
    const eventEmitter: EventEmitter<boolean> = jasmine.createSpyObj('EventEmitter', ['emit']);
    component.msgBoxEvent = eventEmitter;
    component.sendEvent('yes');
    expect(component.msgBoxEvent.emit).toHaveBeenCalled();
    expect(component.msgBoxEvent.emit).toHaveBeenCalledWith(true);
  });
});
