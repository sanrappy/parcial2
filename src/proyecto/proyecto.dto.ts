import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ProyectoDto {
    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;

    @IsString()
    @IsNotEmpty()
    readonly url: string;

}