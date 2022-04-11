import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Especialidad } from '../model/especialidad';
import { environment } from 'src/environments/environment';

@Injectable()
export class EspecialidadService {

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Especialidad[]>(`${environment.endpoint}/v1/clinica/especialidades`, this.http.optsName('consultar especialidades'));
  }
}
