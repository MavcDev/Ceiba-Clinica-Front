import { Component, Input, OnInit } from '@angular/core';
import { UsuarioData } from '@shared/model/Usuario/usuario-data';
import { FormatedService } from '@shared/service/formated.service';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styles: ['']
})
export class CardUsuarioComponent implements OnInit {

  @Input()
  usuario: UsuarioData;

  constructor(public formated: FormatedService) { }

  ngOnInit(): void {
  }

}
