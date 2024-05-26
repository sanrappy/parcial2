import { TypeOrmModule } from "@nestjs/typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [PropuestaEntity, ProyectoEntity, ProfesorEntity, EstudianteEntity],
      synchronize: true,
      keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([PropuestaEntity, ProyectoEntity, ProfesorEntity, EstudianteEntity]),
];