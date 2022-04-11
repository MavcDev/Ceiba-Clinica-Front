import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { UsuarioPage } from '../page/usuario/usuario.po';
import { browser } from 'protractor';
import { SolicitudcitaPage } from '../page/solicitudcita/solicitudcita.po';

describe('workspace-project Usuario', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let usuario: UsuarioPage;
    let solicitudcita: SolicitudcitaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        usuario = new UsuarioPage();
        solicitudcita = new SolicitudcitaPage();
    });

    it('Deberia crear una solictud', () => {
        // Crear el usuario
        page.navigateTo();
        navBar.clickIrSolicitudCita();

        usuario.ingresarIdentificacionBuscar('1117522445');
        usuario.clickBotonBuscar();
        usuario.clickBotonIrCrearUsuario();
        usuario.ingresarNombresForm('Manuel Alberto');
        usuario.ingresarPrimerApellidoForm('Velasquez');
        usuario.ingresarSegundoApellidoForm('Rivera');
        usuario.ingresarFechaNacimientoForm('12/20/2014');
        browser.sleep(100);
        usuario.clickBotonGuardarUsuario();
        browser.sleep(100);
        usuario.clickBotonSiConfirmarGuardarUsuario();
        browser.sleep(100);
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/solicitudcita/crear;identificacion=1117522445');
        // Crear la solicitud
        solicitudcita.seleccionarEspecialidad();
        solicitudcita.seleccionarMedico();
        solicitudcita.ingresarFechaCita('04/28/2022');
        solicitudcita.seleccionarHorario();
        browser.sleep(100);
        solicitudcita.clickBotonGuardarSolicitud();
        browser.sleep(100);

        expect(solicitudcita.obtenerValorCita()).toBe('$150,000.00');

        solicitudcita.clickBotonSiConfirmarGuardarSolicitud();
        browser.sleep(100);

        expect(solicitudcita.obtenerValorTotal()).toBe('$75,000.00');
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/solicitudcita/consultar;id=1;identificacion=1117522445;nombre=Manuel%20Alberto%20Velasquez%20Rivera');
    });
});
