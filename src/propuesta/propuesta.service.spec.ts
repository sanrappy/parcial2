import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let propuestasList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    propuestasList = [];
    for(let i = 0; i < 10; i++){
      const propuesta = await repository.save({
        titulo: faker.lorem.word(),
        descripcion: faker.lorem.sentence(),
        palabraclave: faker.lorem.word(),
        profesores: []
      });
      propuestasList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all propuestas', async () => {
    const propuestas = await service.findAllPropuesta();
    expect(propuestas).not.toBeNull();
    expect(propuestas).toHaveLength(propuestasList.length);
  });
  
  it('should find a propuesta by id', async () => {
    const storedPropuesta = propuestasList[0];
    const propuesta = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.id).toEqual(storedPropuesta.id);
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo);
    expect(propuesta.descripcion).toEqual(storedPropuesta.descripcion);
    expect(propuesta.palabraclave).toEqual(storedPropuesta.palabraclave);
  });

  it('should throw an exception for an invalid propuesta', async () => {
    await expect(() => service.findPropuestaById('invalid-id')).rejects.toHaveProperty('message', 'Propuesta no encontrada');
  });

  it('should create a new propuesta', async () => {
    const propuesta = await repository.save({
      titulo: faker.lorem.word(),
      descripcion: faker.lorem.sentence(),
      palabraclave: faker.lorem.word(),
      profesores: []
    });

    const newPropuesta = await service.crearPropuesta(propuesta);
    const storedPropuesta = await repository.findOne({where: {id: newPropuesta.id}, relations: ['profesores']});
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(propuesta.titulo);
    expect(storedPropuesta.descripcion).toEqual(propuesta.descripcion);
    expect(storedPropuesta.palabraclave).toEqual(propuesta.palabraclave);
  });

  it('should delete a propuesta', async () => {
    const storedPropuesta = propuestasList[0];
    const deletedPropuesta = await service.deletePropuesta(storedPropuesta.id);
    const propuesta = await repository.findOne({where: {id: deletedPropuesta.id}, relations: ['profesores']});
    expect(propuesta).toBeNull();
  });

  it('should throw an exception for an invalid propuesta', async () => {
    await expect(() => service.deletePropuesta('invalid-id')).rejects.toHaveProperty('message', 'Propuesta no encontrada.');
  });
});
