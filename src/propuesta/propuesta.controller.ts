import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { plainToInstance } from 'class-transformer';
import { PropuestaDto } from './propuesta.dto';
import { BusinessErrorsInterceptor } from '../shared/business-errors.interceptor';

@Controller('propuesta')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) { }

    @Get()
    async findAll() {
        return this.propuestaService.findAllPropuesta();
    }

    @Get(':id')
    async findPropuestaById(@Param('id') id: string) {
        return this.propuestaService.findPropuestaById(id);
    }

    @Post()
    async create(@Body() propuestaDto: PropuestaDto) {
        const propuesta = plainToInstance(PropuestaEntity, propuestaDto);
        return this.propuestaService.crearPropuesta(propuesta);
    }

    @Delete(':id')
    @HttpCode(204)
    async deletePropuesta(@Param('id') id: string) {
        return this.propuestaService.deletePropuesta(id);
    }
}
