import { IsString, IsEmail, IsNumber, Min, Max, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string; 

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string; 

  @IsStrongPassword({}, { message: 'Debe ser una contraseña válida' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string; 

  @IsNumber({}, { message: 'La edad debe ser un número' })
  @Min(0, { message: 'La edad debe ser mayor o igual a 0' })
  @Max(150, { message: 'La edad debe ser menor o igual a 117' })
  age: number;

  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(0, { message: 'El peso debe ser mayor o igual a 0' })
  @Max(150, { message: 'El peso debe ser menor o igual a 600' })
  weight: number;

  @IsNumber({}, { message: 'La altura debe ser un número' })
  @Min(0, { message: 'La altura debe ser mayor o igual a 0' })
  @Max(150, { message: 'La altura debe ser menor o igual a 2.6' })
  height: number;
}