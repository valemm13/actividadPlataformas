import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('Creando nuevo usuario en la BD:', createUserDto);

    const user = this.userRepository.create({
      name: createUserDto.name.trim(), 
      email: createUserDto.email.toLowerCase().trim(), 
      password : createUserDto.password.toLowerCase().trim(),
      age: createUserDto.age,
      weight: createUserDto.weight,
      height: createUserDto.height,
    });

    const savedUser = await this.userRepository.save(user);
    console.log('Usuario creado exitosamente en la BD:', savedUser);

    return savedUser;
  }

  async findAll(): Promise<UserEntity[]> {
    console.log('Obteniendo usuarios activos desde la base de datos...');

    return await this.userRepository.find({
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    console.log(`Buscando usuario con ID: ${id} en la BD`);

    if (isNaN(id)) {
      throw new BadRequestException('ID debe ser un número válido');
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    console.log(`Actualizando usuario ID ${id} en la BD:`, updateUserDto);

    if (isNaN(id)) {
      throw new BadRequestException('ID debe ser un número válido');
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`Ya existe otro usuario con el email ${updateUserDto.email}`);
      }
    }
    if (updateUserDto.name) user.name = updateUserDto.name.trim();
    if (updateUserDto.email) user.email = updateUserDto.email.toLowerCase().trim();
    if (updateUserDto.age !== undefined) user.age = updateUserDto.age;

    const updatedUser = await this.userRepository.save(user);
    console.log('Usuario actualizado exitosamente en la BD:', updatedUser);

    return updatedUser;
  }

  async remove(id: number): Promise<UserEntity> {
    console.log(`Eliminando usuario ID ${id} en la BD`);

    if (isNaN(id)) {
      throw new BadRequestException('ID debe ser un número válido');
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const deletedUser = await this.userRepository.save(user);

    console.log('Usuario eliminado exitosamente en la BD:', deletedUser);
    return deletedUser;
  }
}

