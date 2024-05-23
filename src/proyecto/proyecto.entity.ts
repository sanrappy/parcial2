import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";

export class ProyectoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    url: string;

    @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante: EstudianteEntity;

    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
    propuesta: PropuestaEntity;
}
