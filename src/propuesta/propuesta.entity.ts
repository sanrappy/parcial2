import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraclave: string;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    proyecto: ProyectoEntity;

    @OneToMany(() => ProfesorEntity, profesor => profesor.propuesta)
    profesores: ProfesorEntity[];
}
