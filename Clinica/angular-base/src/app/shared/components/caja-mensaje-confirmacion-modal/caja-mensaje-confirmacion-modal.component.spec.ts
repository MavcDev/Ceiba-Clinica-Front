import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CajaMensajeConfirmacionModalComponent } from './caja-mensaje-confirmacion-modal.component';

describe('CajaMensajeConfirmacionModalComponent', () => {
  let component: CajaMensajeConfirmacionModalComponent;
  let fixture: ComponentFixture<CajaMensajeConfirmacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaMensajeConfirmacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaMensajeConfirmacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valida el abrir del modal', () => {
    const titulo = 'Titulo';
    const mensaje = 'Mensaje';
    const modal: NgbModal = TestBed.inject(NgbModal);
    spyOn(modal, 'open').and.callThrough();
    component.abrir(titulo, mensaje);
    expect(component.titulo).toBe(titulo);
    expect(component.mensaje).toBe(mensaje);
    expect(modal.open).toHaveBeenCalled();
  });

  it('Valida la emision de la confirmacion si', () => {
    spyOn(component.emitirEvento, 'emit');
    fixture.detectChanges();
    component.enviarConfirmacion('yes');
    expect(component.emitirEvento.emit).toHaveBeenCalledWith(true);
  });

  it('Valida la emision de cancelacion', () => {
    spyOn(component.emitirEvento, 'emit');
    fixture.detectChanges();
    component.enviarConfirmacion('not');
    expect(component.emitirEvento.emit).toHaveBeenCalledWith(false);
  });
});
