import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CajaMensajeCrearUsuarioComponent } from './caja-mensaje-crear-usuario.component';

describe('CajaMensajeCrearUsuarioComponent', () => {
  let component: CajaMensajeCrearUsuarioComponent;
  let fixture: ComponentFixture<CajaMensajeCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CajaMensajeCrearUsuarioComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaMensajeCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valida abrir del modal', () => {
    const modal: NgbModal = TestBed.inject(NgbModal);
    spyOn(modal, 'open').and.callThrough();
    component.abrir('1117522442');
    expect(modal.open).toHaveBeenCalled();
  });

  it('Valida la emision de la confirmacion de crear usuario', () => {
    spyOn(component.emitirEvento, 'emit');
    fixture.detectChanges();
    component.enviarConfirmacion('yes');
    expect(component.emitirEvento.emit).toHaveBeenCalledWith(true);
  });

  it('Valida la emision de cancelacion de crear usuario', () => {
    spyOn(component.emitirEvento, 'emit');
    fixture.detectChanges();
    component.enviarConfirmacion('close');
    expect(component.emitirEvento.emit).toHaveBeenCalledWith(false);
  });
});
