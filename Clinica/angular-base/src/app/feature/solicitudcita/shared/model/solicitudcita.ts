export class Solicitudcita {
    idUsuario: string;
    idEspecialidad: string;
    idMedico: string;
    idHorario: string;
    fechaCita: string;
    fechaSolicitud: string;

    constructor(idUsuario: string,
                idEspecialidad: string,
                idMedico: string,
                idHorario: string,
                fechaCita: string,
                fechaSolicitud: string){
            this.idUsuario = idUsuario;
            this.idEspecialidad = idEspecialidad;
            this.idMedico = idMedico;
            this.idHorario = idHorario;
            this.fechaCita = fechaCita;
            this.fechaSolicitud = fechaSolicitud;
    }
}
