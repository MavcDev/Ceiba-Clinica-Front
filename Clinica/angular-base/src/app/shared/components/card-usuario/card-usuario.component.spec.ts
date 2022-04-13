import { CurrencyPipe, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatedService } from '@shared/service/formated.service';
import { UsuarioModule } from '../../../feature/usuario/usuario.module';

import { CardUsuarioComponent } from './card-usuario.component';

describe('CardUsuarioComponent', () => {
  let component: CardUsuarioComponent;
  let fixture: ComponentFixture<CardUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UsuarioModule
      ],
      providers: [
        FormatedService,
        CurrencyPipe,
        DatePipe
      ],
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
