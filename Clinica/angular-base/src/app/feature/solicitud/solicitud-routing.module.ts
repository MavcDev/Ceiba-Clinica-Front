import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudComponent,
    children: [
      {
        path: 'crear',
        component: CrearSolicitudComponent
      },
      {
        path: 'consultar',
        component: ConsultarSolicitudComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudcitaRoutingModule { }
