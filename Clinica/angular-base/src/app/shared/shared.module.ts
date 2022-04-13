import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';
import { CardUsuarioComponent } from './components/card-usuario/card-usuario.component';
import { CajaMensajeErrorModalComponent } from './components/caja-mensaje-error-modal/caja-mensaje-error-modal.component';
import { CajaMensajeModalComponent } from './components/caja-mensaje-modal/caja-mensaje-modal.component';
import { CajaMensajeConfirmacionModalComponent } from './components/caja-mensaje-confirmacion-modal/caja-mensaje-confirmacion-modal.component';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    CardUsuarioComponent,
    CajaMensajeModalComponent,
    CajaMensajeConfirmacionModalComponent,
    CajaMensajeErrorModalComponent
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    CardUsuarioComponent,
    CajaMensajeModalComponent,
    CajaMensajeConfirmacionModalComponent,
    CajaMensajeErrorModalComponent
  ],
  entryComponents: [
    CajaMensajeErrorModalComponent
  ]
})
export class SharedModule { }
