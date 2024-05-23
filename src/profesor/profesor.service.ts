import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor(profesor: ProfesorEntity) : Promise<ProfesorEntity>{
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: string) : Promise<ProfesorEntity>{
        const profesor = await this.profesorRepository.findOne({where: {id}});
        if (!profesor) {
            return null;
        }
        else {
            return profesor;
        }
    }

    async eliminarProfesorId(id: string) : Promise<ProfesorEntity>{
        const profesor = await this.profesorRepository.findOne({where: {id}});
        if(!profesor){
            return null;
        }
        else{
            await this.profesorRepository.delete({id});
            return profesor;
        }
    }

    async eliminarProfesorCedula(cedula: number) : Promise<ProfesorEntity>{
        const profesor = await this.profesorRepository.findOne({where: {cedula}});
        if(!profesor){
            return null;
        }
        else{
            await this.profesorRepository.delete({cedula});
            return profesor;
        }
    }
}
