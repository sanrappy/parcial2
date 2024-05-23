import { Column, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropuestaEntity } from "../propuesta/propuesta.entity";

export class ProfesorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cedula: number;
    
    @Column()
    nombre: string;

    @Column()
    ginvestigacion: string;

    @Column()
    numextension: number;

    @ManyToOne(() => PropuestaEntity, propuesta => propuesta.profesores)
    propuesta: PropuestaEntity;
}
