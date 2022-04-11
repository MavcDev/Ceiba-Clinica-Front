import { CurrencyPipe, DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { FormatedService } from './formated.service';

describe('FormatedService', () => {
  let service: FormatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormatedService,
        DatePipe,
        CurrencyPipe
      ]
    });
    service = TestBed.inject(FormatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia devolver espacio en blanco', () => {
    const resultDate = service.date(null);
    const resultDateTime = service.dateTime(null);
    const resultCurrency = service.currency(null);

    expect(resultDate).toBe('');
    expect(resultDateTime).toBe('');
    expect(resultCurrency).toBe('0');
  });

  it('Deberia devolver formato correctos', () => {
    const date = new Date();
    const valor = '10000';
    const resultDate = service.date(date);
    const resultDateTime = service.dateTime(date);
    const resultCurrency = service.currency(valor);

    const mesActual = date.getMonth() + 1;
    const dia = (date.getDate() < 10) ? '0'.concat(date.getDate().toString()) : date.getDate().toString();
    const mes = (mesActual < 10) ? '0'.concat(mesActual.toString()) : mesActual.toString();
    const año = date.getFullYear();

    let horaActual = date.getHours();
    if (horaActual === 0){
      horaActual = 12;
    }

    horaActual = horaActual > 12 ? horaActual - 12 : horaActual;
    const hora = (horaActual  < 10) ? '0'.concat(horaActual.toString()) : horaActual.toString();
    const minuto = (date.getMinutes() < 10) ? '0'.concat(date.getMinutes().toString()) : date.getMinutes().toString();
    const segundo = (date.getSeconds() < 10) ? '0'.concat(date.getSeconds().toString()) : date.getSeconds().toString();

    expect(resultDate).toBe(`${dia}/${mes}/${año}`);
    expect(resultDateTime).toBe(`${dia}/${mes}/${año} ${hora}:${minuto}:${segundo}`);
    expect(resultCurrency).toBe('$10,000.00');
  });
});
