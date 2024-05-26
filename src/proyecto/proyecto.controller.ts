import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoDto } from './proyecto.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService : ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto : ProyectoDto){
        const proyecto = plainToInstance(ProyectoEntity, proyectoDto);
        return await this.proyectoService.crearProyecto(proyecto);
    }
}
