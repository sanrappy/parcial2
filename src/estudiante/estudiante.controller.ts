import { Controller, Get, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService : EstudianteService) {}

    @Post()
    async crearEstudiante() {
        const estudiante : EstudianteEntity = plainToInstance(EstudianteEntity, EstudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':id')
    async findEstudianteById(id: string) {
        return await this.estudianteService.findEstudianteById(id);
    }

}
