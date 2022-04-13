import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { BuscarIdentificacionComponent } from './components/buscar-identificacion/buscar-identificacion.component';
import { UsuarioService } from './shared/service/usuario.service';
import { SharedModule } from '@shared/shared.module';
import { CajaMensajeCrearUsuarioComponent } from './components/caja-mensaje-crear-usuario/caja-mensaje-crear-usuario.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    CrearUsuarioComponent,
    BuscarIdentificacionComponent,
    CajaMensajeCrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    SharedModule
  ],
  providers: [UsuarioService, DatePipe]
})
export class UsuarioModule { }
