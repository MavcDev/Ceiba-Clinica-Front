import { Component, Input } from '@angular/core';
import { UsuarioData } from '@shared/model/usuario/usuario-data';
import { FormatedService } from '@shared/service/formated.service';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styles: ['']
})
export class CardUsuarioComponent {

  @Input()
  usuario: UsuarioData;

  constructor(public formated: FormatedService) { }
}
