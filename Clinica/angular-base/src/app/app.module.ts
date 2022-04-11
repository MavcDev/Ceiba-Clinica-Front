import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModule } from './feature/usuario/usuario.module';
import { SolicitudcitaModule } from './feature/solicitudcita/solicitudcita.module';
import { ToolModule } from './feature/tool/tool.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,
    SolicitudcitaModule,
    CoreModule,
    ToolModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
