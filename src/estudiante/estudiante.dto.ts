import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly codestudiante: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numcreditosaprobados: number;
}