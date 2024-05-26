import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectosList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    proyectosList = [];
    for(let i = 0; i < 10; i++){
      const proyecto = await repository.save({
        fechaInicio: faker.date.recent(),
        fechaFin: faker.date.future(),
        url: faker.lorem.word(),
      });
      proyectosList.push(proyecto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new proyecto', async () => {
    const proyecto = await repository.save({
      fechaInicio: faker.date.recent(),
      fechaFin: faker.date.future(),
      url: faker.lorem.word(),
    });

    const newProyecto = await service.crearProyecto(proyecto);
    const storedProyecto = await repository.findOne({where: {id: newProyecto.id}});
    expect(storedProyecto).not.toBeNull();
    expect(storedProyecto.fechaInicio).toEqual(proyecto.fechaInicio);
    expect(storedProyecto.fechaFin).toEqual(proyecto.fechaFin);
    expect(storedProyecto.url).toEqual(proyecto.url);
  });
});
