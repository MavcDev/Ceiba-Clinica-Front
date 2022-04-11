import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpService) { }

  consultar(identificacion: string){
    const params = new HttpParams().set('identificacion', identificacion);
    const options = this.http.optsName('consultar usuario por identificacion');
    options.params = params;
    return this.http.doGet<any>(`${environment.endpoint}/v1/clinica/usuarios`, options);
  }

  guardar(usuario: Usuario){
    return this.http.doPost<Usuario, boolean>(`${environment.endpoint}/v1/clinica/usuarios`, usuario, this.http.optsName('crear/actualizar usuarios'));
  }
}
