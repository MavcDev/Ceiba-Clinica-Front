import { Component, Input, OnInit } from '@angular/core';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.css']
})
export class CardUsuarioComponent implements OnInit {

  @Input()
  usuario: any;

  constructor(public formated: FormatedService) { }

  ngOnInit(): void {
  }

}
