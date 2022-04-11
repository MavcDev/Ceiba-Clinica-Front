export class Usuario {
    id: string;
    identificacion: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: Date;
    fechaCreacion: Date;

    constructor(id: string,
                identificacion: string,
                nombres: string,
                primerApellido: string,
                segundoApellido: string,
                fechaNacimiento: Date,
                fechaCreacion: Date){
            this.id = id;
            this.identificacion = identificacion;
            this.nombres = nombres;
            this.primerApellido = primerApellido;
            this.segundoApellido = segundoApellido;
            this.fechaNacimiento = fechaNacimiento;
            this.fechaCreacion = fechaCreacion;
    }
}
