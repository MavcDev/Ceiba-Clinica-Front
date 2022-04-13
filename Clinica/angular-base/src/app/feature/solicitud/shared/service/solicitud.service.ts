import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { SolicitudData } from '../model/solicitud-data';
import { Solicitud } from '../model/solicitud';

@Injectable()
export class SolicitudService {

  constructor(private http: HttpService) { }

  public consultar(idUsuario: string){
    const params = new HttpParams().set('usuario', idUsuario);
    const options = this.http.optsName('consultar solicitudes de cita por id usuario');
    options.params = params;
    return this.http.doGet<SolicitudData[]>(`${environment.endpoint}/v1/clinica/solicitudes`, options);
  }

  public guardar(solicitud: Solicitud){
    return this.http.doPost<Solicitud, boolean>(`${environment.endpoint}/v1/clinica/solicitudes`, solicitud, this.http.optsName('crear/actualizar solicitud'));
  }
}
