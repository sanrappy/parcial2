import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta/propuesta.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';

@Module({
  imports: [EstudianteModule, ProfesorModule, ProyectoModule, PropuestaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [PropuestaEntity, ProyectoEntity, ProfesorEntity, EstudianteEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
