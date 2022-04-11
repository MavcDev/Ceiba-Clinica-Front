import { by, element } from 'protractor';

export class UsuarioPage {

    // Buscar
    private inputIdentificacionBuscar = element(by.id('inputIdentificacion'));
    private botonBuscarIndetificacion = element(by.id('btnBuscarUsuario'));
    private bontonIrCrearUsuario = element(by.id('btnCrearUsuario'));

    // Crear
    private inputIdentificacionForm = element(by.id('inputIdentificacion'));
    private inputNombresForm = element(by.id('inputNombres'));
    private inputPrimerApellidoForm = element(by.id('inputPrimerApellido'));
    private inputSegundoApellidoForm = element(by.id('inputSegundoApellido'));
    private inputFechaNacimientoForm = element(by.id('inputFenacimiento'));
    private botonGuardarUsuario = element(by.id('btnSubmitUsuario'));
    private botonMsgBoxYes = element(by.id('msgboxYes'));

    async ingresarIdentificacionBuscar(identificacionUsuario) {
        await this.inputIdentificacionBuscar.sendKeys(identificacionUsuario);
    }

    async clickBotonBuscar(){
        await this.botonBuscarIndetificacion.click();
    }

    async clickBotonIrCrearUsuario(){
        await this.bontonIrCrearUsuario.click();
    }

    // Crear
    async ingresarIdentificacionForm(identificacionUsuario) {
        await this.inputIdentificacionForm.sendKeys(identificacionUsuario);
    }

    async ingresarNombresForm(nombresUsuario) {
        await this.inputNombresForm.sendKeys(nombresUsuario);
    }

    async ingresarPrimerApellidoForm(primerApellidoUsuario) {
        await this.inputPrimerApellidoForm.sendKeys(primerApellidoUsuario);
    }

    async ingresarSegundoApellidoForm(segundpApellidoUsuario) {
        await this.inputSegundoApellidoForm.sendKeys(segundpApellidoUsuario);
    }

    async ingresarFechaNacimientoForm(fechaNacimientoUsuario) {
        await this.inputFechaNacimientoForm.sendKeys(fechaNacimientoUsuario);
    }

    async clickBotonGuardarUsuario(){
        await this.botonGuardarUsuario.click();
    }

    async clickBotonSiConfirmarGuardarUsuario(){
        await this.botonMsgBoxYes.click();
    }
}
