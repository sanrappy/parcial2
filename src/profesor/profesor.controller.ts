import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { plainToInstance } from 'class-transformer';
import { ProfesorDto } from './profesor.dto';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService : ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorDto : ProfesorDto){
        const profesor = plainToInstance(ProfesorEntity, profesorDto);
        return await this.profesorService.crearProfesor(profesor);
    }

    @Get(':id')
    async findProfesorById(@Param('id') id: string){
        return await this.profesorService.findProfesorById(id);
    }

    @Delete(':id')
    @HttpCode(204)
    async eliminarProfesorId(@Param('id') id: string){
        return await this.profesorService.eliminarProfesorId(id);
    }

    @Delete('/cedula/:cedula')
    @HttpCode(204)
    async eliminarProfesorCedula(@Param('cedula') cedula: number){
        return await this.profesorService.eliminarProfesorCedula(cedula);
    }
}
