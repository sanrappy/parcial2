import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private estudianteRepository: Repository<EstudianteEntity>
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity) : Promise<EstudianteEntity>{
        if(estudiante.codestudiante.length == 10){
            return await this.estudianteRepository.save(estudiante);
        }
    }

    async findEstudianteById(id: string) : Promise<EstudianteEntity>{
        const estudiante = await this.estudianteRepository.findOne({where: {id}});
        if (!estudiante) {
            throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        }
        else {
            return estudiante;
        }
    }
}
