import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { SolicitudcitaRoutingModule } from './solicitudcita-routing.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { CardSolicitudcitaComponent } from './components/card-solicitudcita/card-solicitudcita.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
import { SolicitudcitaComponent } from './components/solicitudcita/solicitudcita.component';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';
import { SolicitudcitaService } from './shared/service/solicitudcita.service';
import { EspecialidadService } from '../especialidad/shared/service/especialidad.service';
import { MedicoService } from '../medico/shared/service/medico.service';
import { HorarioService } from '../horario/shared/service/horario.service';
import { ToolModule } from '../tool/tool.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CrearSolicitudComponent,
    ConsultarSolicitudComponent,
    SolicitudcitaComponent,
    CardSolicitudcitaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitudcitaRoutingModule,
    UsuarioModule,
    ToolModule,
    SharedModule
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    SolicitudcitaService,
    EspecialidadService,
    MedicoService,
    HorarioService,
    FormatedService
  ]
})
export class SolicitudcitaModule { }
