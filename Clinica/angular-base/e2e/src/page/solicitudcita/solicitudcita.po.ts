import { browser, by, element } from 'protractor';

export class SolicitudcitaPage {

    private inputEspecialidadForm = element(by.id('selectEspecialidad'));
    private inputMedicoForm = element(by.id('selectMedico'));
    private inputFechaCitaForm = element(by.id('fechaCita'));
    private inputHorarioForm = element(by.id('selectHorario'));
    private inputValorCitaForm = element(by.id('valorcita'));
    private botonGuardarSolicitud = element(by.id('btnSubmitSolicitud'));
    private botonMsgBoxYes = element(by.id('msgboxYes'));
    private inputValorTotal = element(by.id('inputValorTotal'));

    async seleccionarEspecialidad() {
        this.inputEspecialidadForm.all(by.tagName('option'))
            .then((options) => {
                options[1].click();
            });
        browser.sleep(500);
    }

    async seleccionarMedico() {
        this.inputMedicoForm.all(by.tagName('option'))
            .then((options) => {
                options[1].click();
            });
        browser.sleep(500);
    }

    async ingresarFechaCita(fecha) {
        this.inputFechaCitaForm.sendKeys(fecha);
    }

    async seleccionarHorario() {
        this.inputHorarioForm.all(by.tagName('option'))
            .then((options) => {
                options[3].click();
            });
        browser.sleep(500);
    }

    async clickBotonGuardarSolicitud() {
        await this.botonGuardarSolicitud.click();
    }

    async obtenerValorCita() {
        return await this.inputValorCitaForm.getAttribute('value');
    }

    async clickBotonSiConfirmarGuardarSolicitud() {
        await this.botonMsgBoxYes.click();
    }

    async obtenerValorTotal() {
        return await this.inputValorTotal.getAttribute('value');
    }
}
