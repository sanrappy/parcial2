import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private propuestaRepository: Repository<PropuestaEntity>
    ) {}

    async findAllPropuesta() {
        return await this.propuestaRepository.find({relations: ['profesores']});
    }

    async findPropuestaById(id: string) {
        const propuesta = await this.propuestaRepository.findOne({where: {id}, relations: ['profesores']});
        if (!propuesta) {
            throw new BusinessLogicException('Propuesta no encontrada', BusinessError.NOT_FOUND);
        }
        else {
            return propuesta;
        }
    }

    async crearPropuesta(propuesta: PropuestaEntity) : Promise<PropuestaEntity>{
        if(propuesta.titulo != null){
            return await this.propuestaRepository.save(propuesta);
        }
    }

    async deletePropuesta(id: string) : Promise<PropuestaEntity>{
        const propuesta = await this.propuestaRepository.findOne({where: {id}});
        if(!propuesta){
            throw new BusinessLogicException('Propuesta no encontrada.', BusinessError.NOT_FOUND);
        }
        else if(propuesta.proyecto != null){
            throw new BusinessLogicException('La propuesta tiene un proyecto asignado.', BusinessError.PRECONDITION_FAILED);
        }
        else{
            await this.propuestaRepository.delete({id});
            return propuesta;
        }
    }
}
