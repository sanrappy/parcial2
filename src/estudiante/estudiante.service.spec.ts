import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for(let i = 0; i < 10; i++){
      const estudiante : EstudianteEntity = await repository.save({
        nombre: faker.person.firstName(),
        codestudiante: faker.number.int({min: 1000000000, max: 9999999999}).toString(),
        numcreditosaprobados: faker.number.int({min: 0, max: 100})
    })
    estudiantesList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new student', async () => {
    const estudiante : EstudianteEntity = await repository.save({
      nombre: faker.person.firstName(),
      codestudiante: faker.number.int({min: 1000000000, max: 9999999999}).toString(),
      numcreditosaprobados: faker.number.int({min: 0, max: 100}),
      proyecto: null
    });

    const newEstudiante : EstudianteEntity = await service.crearEstudiante(estudiante);
    const storedEstudiante : EstudianteEntity = await repository.findOne({where: {id: newEstudiante.id}});
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.nombre).toEqual(estudiante.nombre);
    expect(storedEstudiante.codestudiante).toEqual(estudiante.codestudiante);
    expect(storedEstudiante.numcreditosaprobados).toEqual(estudiante.numcreditosaprobados);
  });

  

  it('should find a student by id', async () => {
    const storedEstudiante : EstudianteEntity = estudiantesList[0];
    const estudiante : EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
    expect(estudiante.codestudiante).toEqual(storedEstudiante.codestudiante);
    expect(estudiante.numcreditosaprobados).toEqual(storedEstudiante.numcreditosaprobados);
  });

  it('should throw an exception for an invalid estudinate.', async () => {
    await expect(() => service.findEstudianteById('invalid-id')).rejects.toHaveProperty('message', 'Estudiante no encontrado');
  });
});
