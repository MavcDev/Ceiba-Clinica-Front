import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CajaMensajeModalComponent } from './caja-mensaje-modal.component';

describe('CajaMensajeModalComponent', () => {
  let component: CajaMensajeModalComponent;
  let fixture: ComponentFixture<CajaMensajeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaMensajeModalComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaMensajeModalComponent);
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
});
