import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PropuestaModule } from './propuesta/propuesta.module';

@Module({
  imports: [EstudianteModule, ProfesorModule, ProyectoModule, PropuestaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
