export class UsuarioData {
    id: string;
    identificacion: string;
    nombreCompleto: string;
    fechaNacimiento: string;

    constructor(
        id: string,
        identificacion: string,
        nombreCompleto: string,
        fechaNacimiento: string
    ){
        this.id = id;
        this.identificacion = identificacion;
        this.nombreCompleto = nombreCompleto;
        this.fechaNacimiento = fechaNacimiento;
    }
}
