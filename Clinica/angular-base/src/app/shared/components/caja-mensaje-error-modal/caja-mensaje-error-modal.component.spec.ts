import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CajaMensajeErrorModalComponent } from './caja-mensaje-error-modal.component';

describe('CajaMensajeErrorModalComponent', () => {
  let component: CajaMensajeErrorModalComponent;
  let fixture: ComponentFixture<CajaMensajeErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaMensajeErrorModalComponent ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaMensajeErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
