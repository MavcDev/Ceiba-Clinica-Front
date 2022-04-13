export class SolicitudData {
    id: string;
    identificacionUsuario: string;
    medico: string;
    usuario: string;
    especialidad: string;
    fechaCita: string;
    fechaSolicitud: string;
    horaFinal: string;
    horaInicio: string;
    valor: number;
    valorBase: number;
    descuentoMenorEdad: boolean;

    constructor(
        id: string,
        {
            identificacionUsuario,
            medico,
            usuario,
            especialidad,
            fechaCita,
            fechaSolicitud
        },
        horaFinal: string,
        horaInicio: string,
        valor: number,
        valorBase: number,
        descuentoMenorEdad: boolean
    ) {
        this.id = id;
        this.identificacionUsuario = identificacionUsuario;
        this.medico = medico;
        this.usuario = usuario;
        this.especialidad = especialidad;
        this.fechaCita = fechaCita;
        this.fechaSolicitud = fechaSolicitud;
        this.horaFinal = horaFinal;
        this.horaInicio = horaInicio;
        this.valor = valor;
        this.valorBase = valorBase;
        this.descuentoMenorEdad = descuentoMenorEdad;
    }
}
