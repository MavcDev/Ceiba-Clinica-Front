import { Injectable } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Injectable()
export class FormatedService {

  constructor(protected datePipe: DatePipe, protected currencyPipe: CurrencyPipe) { }

  public date(date: Date){
    if (!date){
      return '';
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  public dateTime(date: Date){
    if (!date){
      return '';
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm:ss');
  }

  public currency(currency: number){
    if (!currency){
      return '0';
    }
    return this.currencyPipe.transform(currency);
  }
}
