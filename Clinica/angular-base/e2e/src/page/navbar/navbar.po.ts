import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkProducto = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));

    linkIrSolicitud = element(by.id('linkIrSolicitud'));

    async clickIrSolicitudCita() {
        await this.linkIrSolicitud.click();
    }
}
