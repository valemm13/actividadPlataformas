import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() : Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Post()
    addUser(@Body() Usuario: CreateUserDto):Promise<UserEntity>{
       return  this.usersService.create(Usuario);
  
    }

    @Delete(':id') 
    deleteUser(@Param("id") id : number): void{ 
        this.usersService.remove(id) 
    }

    @Put() 
    putUser(@Param("id") id : number, @Body() putUser : UserEntity){ 
      return this.usersService.update(id,putUser) 
    }

}
