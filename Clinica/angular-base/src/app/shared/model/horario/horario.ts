export class Horario {
    id: string;
    horaInicial: string;
    horaFinal: string;

    constructor(id: string, horaInicial: string, horaFinal: string){
        this.id = id;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
    }
}
