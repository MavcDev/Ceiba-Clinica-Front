import { Component, Input } from '@angular/core';
import { FormatedService } from '@shared/service/formated.service';
import { SolicitudData } from '../../shared/model/solicitud-data';

@Component({
  selector: 'app-card-solicitud',
  templateUrl: './card-solicitud.component.html',
  styles: ['']
})
export class CardSolicitudComponent {

  @Input()
  solicitud: SolicitudData;

  constructor(public formated: FormatedService) { }
}
