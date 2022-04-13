import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Medico } from '@shared/model/medico/medico';

@Injectable()
export class MedicoService {

  constructor(protected http: HttpService) { }

  public consultar(idEspecialidad: string){
    const params = new HttpParams().set('especialidad', idEspecialidad);
    const options = this.http.optsName('consultar medicos por especialidad');
    options.params = params;
    return this.http.doGet<Medico[]>(`${environment.endpoint}/v1/clinica/medicos`, options);
  }
}
