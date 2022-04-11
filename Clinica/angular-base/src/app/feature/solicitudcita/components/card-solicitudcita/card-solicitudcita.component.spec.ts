import { CurrencyPipe, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';

import { CardSolicitudcitaComponent } from './card-solicitudcita.component';

describe('CardSolicitudcitaComponent', () => {
  let component: CardSolicitudcitaComponent;
  let fixture: ComponentFixture<CardSolicitudcitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSolicitudcitaComponent ],
      providers: [
        FormatedService,
        DatePipe,
        CurrencyPipe
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSolicitudcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
