import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    codestudiante: string;

    @Column()
    numcreditosaprobados: number;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    proyecto: ProyectoEntity;

}
