import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';
import { EstudianteDto } from './estudiante.dto';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';

@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
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
