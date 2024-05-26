import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesoresList = [];
    for(let i = 0; i < 10; i++){
      const profesor : ProfesorEntity = await repository.save({
        cedula: faker.number.int({min: 1000000000, max: 9999999999}),
        nombre: faker.person.firstName(),
        ginvestigacion: faker.lorem.word(),
        numextension: faker.number.int({min: 1000000, max: 9999999})
      });
      profesoresList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new professor', async () => {
    const profesor = await repository.save({
      cedula: faker.number.int({min: 1000000000, max: 9999999999}),
      nombre: faker.person.firstName(),
      ginvestigacion: faker.lorem.word(),
      numextension: faker.number.int({min: 1000000, max: 9999999})
    });

    const newProfesor = await service.crearProfesor(profesor);
    const storedProfesor = await repository.findOne({where: {id: newProfesor.id}});
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.cedula).toEqual(profesor.cedula);
    expect(storedProfesor.nombre).toEqual(profesor.nombre);
    expect(storedProfesor.ginvestigacion).toEqual(profesor.ginvestigacion);
    expect(storedProfesor.numextension).toEqual(profesor.numextension);
  });

  it('should find a professor by id', async () => {
    const storedProfesor = profesoresList[0];
    const profesor = await service.findProfesorById(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.id).toEqual(storedProfesor.id);
    expect(profesor.cedula).toEqual(storedProfesor.cedula);
    expect(profesor.nombre).toEqual(storedProfesor.nombre);
    expect(profesor.ginvestigacion).toEqual(storedProfesor.ginvestigacion);
    expect(profesor.numextension).toEqual(storedProfesor.numextension);
  });

  it('should throw an exception for an invalid professor', async () => {
    await expect(() => service.findProfesorById('invalid-id')).rejects.toHaveProperty('message','Profesor no encontrado');
  });

  it('should delete a professor by id', async () => {
    const profesor = profesoresList[0];
    await service.eliminarProfesorId(profesor.id);

    const deletedProfesor = await repository.findOne({where: {id: profesor.id}});
    expect(deletedProfesor).toBeNull();
  });

  it('should throw an exception for an invalid professor id', async () => {
    const profesor = profesoresList[0];
    await service.eliminarProfesorId(profesor.id);
    await expect(() => service.eliminarProfesorId("invalid-id")).rejects.toHaveProperty('message','Profesor no encontrado');
  });

  it('should delete a professor by cedula', async () => {
    const profesor = profesoresList[0];
    await service.eliminarProfesorCedula(profesor.cedula);

    const deletedProfesor = await repository.findOne({where: {cedula: profesor.cedula}});
    expect(deletedProfesor).toBeNull();
  });

  it('should throw an exception for an invalid professor cedula', async () => {
    const profesor = profesoresList[0];
    await service.eliminarProfesorCedula(profesor.cedula);
    await expect(() => service.eliminarProfesorCedula(0)).rejects.toHaveProperty('message','Profesor no encontrado');
  });
});
