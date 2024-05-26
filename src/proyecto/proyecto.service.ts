import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private proyectoRepository: Repository<ProyectoEntity>
    ) {}

    async crearProyecto(proyecto: ProyectoEntity) : Promise<ProyectoEntity>{
        if(proyecto.fechaFin > proyecto.fechaInicio){
            return await this.proyectoRepository.save(proyecto);
        }
        else{
            throw new BusinessLogicException('La fecha de fin debe ser mayor a la fecha de inicio.', BusinessError.PRECONDITION_FAILED);
        }
    }
}
