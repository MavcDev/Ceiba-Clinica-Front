import { Component, Input, OnInit } from '@angular/core';
import { FormatedService } from 'src/app/feature/tool/shared/service/formated.service';


@Component({
  selector: 'app-card-solicitudcita',
  templateUrl: './card-solicitudcita.component.html',
  styleUrls: ['./card-solicitudcita.component.css']
})
export class CardSolicitudcitaComponent implements OnInit {

  @Input()
  solicitud: any;

  constructor(public formated: FormatedService) { }

  ngOnInit(): void {
  }
}
