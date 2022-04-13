import { CurrencyPipe, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatedService } from '@shared/service/formated.service';
import { CardSolicitudComponent } from './card-solicitud.component';


describe('CardSolicitudcitaComponent', () => {
  let component: CardSolicitudComponent;
  let fixture: ComponentFixture<CardSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSolicitudComponent ],
      providers: [
        FormatedService,
        DatePipe,
        CurrencyPipe
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
