import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';

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
            return null;
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
        if(!propuesta || propuesta.proyecto != null){
            return null;
        }
        else{
            await this.propuestaRepository.delete({id});
            return propuesta;
        }
    }
}
