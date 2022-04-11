import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Solicitudcita } from '../model/solicitudcita';

@Injectable()
export class SolicitudcitaService {

  constructor(private http: HttpService) { }

  public consultar(idUsuario: string){
    const params = new HttpParams().set('usuario', idUsuario);
    const options = this.http.optsName('consultar solicitudes de cita por id usuario');
    options.params = params;
    return this.http.doGet<Solicitudcita[]>(`${environment.endpoint}/v1/clinica/solicitudcitas`, options);
  }

  public guardar(solicitudcita: Solicitudcita){
    return this.http.doPost<Solicitudcita, boolean>(`${environment.endpoint}/v1/clinica/solicitudcitas`, solicitudcita, this.http.optsName('crear/actualizar solicitud cita'));
  }
}
