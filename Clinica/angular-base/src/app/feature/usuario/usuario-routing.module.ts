import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarIdentificacionComponent } from './components/buscar-identificacion/buscar-identificacion.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'crear',
        component: CrearUsuarioComponent
      },
      {
        path: 'buscar',
        component: BuscarIdentificacionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
