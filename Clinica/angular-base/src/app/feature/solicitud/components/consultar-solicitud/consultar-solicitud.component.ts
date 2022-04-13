import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaMensajeModalComponent } from '@shared/components/caja-mensaje-modal/caja-mensaje-modal.component';
import { SolicitudService } from '../../shared/service/solicitud.service';

const ID = 'id';
const IDENTIFICACION = 'identificacion';
const NOMBRE = 'nombre';

const REDIRIGIR_CREAR_SOLICITUD_URL = 'solicitud/crear';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styles: ['']
})
export class ConsultarSolicitudComponent implements OnInit {

  id: string;
  identificacion: string;
  nombre: string;
  solicitudes: Array<any>;

  @ViewChild(CajaMensajeModalComponent) mensajeValidacion: CajaMensajeModalComponent;

  constructor(protected route: ActivatedRoute, private router: Router, protected solicitudServicio: SolicitudService) { }

  ngOnInit(): void {
    this.cargarParametros();
    this.cargarSolicitudes();
  }

  cargarParametros() {
    this.id = this.route.snapshot.paramMap.get(ID);
    this.identificacion = this.route.snapshot.paramMap.get(IDENTIFICACION);
    this.nombre = this.route.snapshot.paramMap.get(NOMBRE);
  }

  cargarSolicitudes() {
    this.solicitudServicio.consultar(this.id).subscribe(
      {
        next: (response: any) => { this.solicitudes = response; }
      });
  }

  redirigirCrearSolicitud() {
    this.router.navigate([REDIRIGIR_CREAR_SOLICITUD_URL, { identificacion: this.identificacion }]);
  }
}
