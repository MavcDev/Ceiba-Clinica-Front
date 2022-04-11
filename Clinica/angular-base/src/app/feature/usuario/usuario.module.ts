import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { BuscarIdentificacionComponent } from './components/buscar-identificacion/buscar-identificacion.component';
import { CardUsuarioComponent } from './shared/components/card-usuario/card-usuario.component';
import { ToolModule } from '../tool/tool.module';
import { UsuarioService } from './shared/service/usuario.service';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    UsuarioComponent,
    CrearUsuarioComponent,
    BuscarIdentificacionComponent,
    CardUsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    ToolModule,
    SharedModule,
  ],
  exports: [
    CardUsuarioComponent
  ],
  providers: [UsuarioService, DatePipe]
})
export class UsuarioModule { }
