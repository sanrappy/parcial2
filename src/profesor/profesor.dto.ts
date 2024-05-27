import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ProfesorDto {
    @IsString()
    @IsNotEmpty()
    readonly cedula: string;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly ginvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numextension: number;
}