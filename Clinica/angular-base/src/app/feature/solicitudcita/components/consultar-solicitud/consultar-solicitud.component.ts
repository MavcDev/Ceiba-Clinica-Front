import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from 'src/app/feature/tool/components/message-box/message-box.component';
import { SolicitudcitaService } from '../../shared/service/solicitudcita.service';


const TITULO_MENSAJE_ERROR = 'Error';

const ID = 'id';
const IDENTIFICACION = 'identificacion';
const NOMBRE = 'nombre';

const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitudcita/crear';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styleUrls: ['./consultar-solicitud.component.css']
})
export class ConsultarSolicitudComponent implements OnInit {

  id: string;
  identificacion: string;
  nombre: string;
  solicitudes: Array<any>;

  @ViewChild(MessageBoxComponent) mesageBox: MessageBoxComponent;

  constructor(protected route: ActivatedRoute, private router: Router, protected solicitudcitaServicio: SolicitudcitaService) { }

  ngOnInit(): void {
    this.cargarParametros();
    this.cargarSolicitudesCita();
  }

  cargarParametros() {
    this.id = this.route.snapshot.paramMap.get(ID);
    this.identificacion = this.route.snapshot.paramMap.get(IDENTIFICACION);
    this.nombre = this.route.snapshot.paramMap.get(NOMBRE);
  }

  cargarSolicitudesCita() {
    this.solicitudcitaServicio.consultar(this.id).subscribe(
      {
        next: (response: any) => { this.solicitudes = response; },
        error: (excepcion) => this.mostrarCajaTexto(TITULO_MENSAJE_ERROR, excepcion?.error?.mensaje),
      });
  }

  redirigirCrearSolicitud() {
    this.router.navigate([REDIRIGIR_CREAR_SOLICITUD_URL, { identificacion: this.identificacion }]);
  }

  mostrarCajaTexto(titulo: string = 'Error', mensaje: string = 'Ocurrio un error inesperado.') {
    this.mesageBox.open(titulo, mensaje);
  }
}
