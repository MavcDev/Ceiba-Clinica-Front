import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Horario } from '@shared/model/horario/horario';
import { environment } from 'src/environments/environment';

@Injectable()
export class HorarioService {

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Horario[]>(`${environment.endpoint}/v1/clinica/horarios`, this.http.optsName('consultar horarios'));
  }
}
