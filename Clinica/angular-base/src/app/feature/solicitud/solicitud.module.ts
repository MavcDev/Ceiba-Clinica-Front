import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { SolicitudcitaRoutingModule } from './solicitud-routing.module';
import { CardSolicitudComponent } from './components/card-solicitud/card-solicitud.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudService } from './shared/service/solicitud.service';
import { SharedModule } from '@shared/shared.module';
import { FormatedService } from '@shared/service/formated.service';
import { EspecialidadService } from '@shared/service/especialidad/especialidad.service';
import { MedicoService } from '@shared/service/medico/medico.service';
import { HorarioService } from '@shared/service/horario/horario.service';

@NgModule({
  declarations: [
    CrearSolicitudComponent,
    ConsultarSolicitudComponent,
    SolicitudComponent,
    CardSolicitudComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitudcitaRoutingModule,
    SharedModule
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    SolicitudService,
    EspecialidadService,
    MedicoService,
    HorarioService,
    FormatedService
  ]
})
export class SolicitudModule { }
