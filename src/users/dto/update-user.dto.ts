import { IsString, IsEmail, IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';


export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string; 

  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email?: string; 

  @IsOptional()
  @IsNumber({}, { message: 'La edad debe ser un número' })
  @Min(0, { message: 'La edad debe ser mayor o igual a 0' })
  @Max(150, { message: 'La edad debe ser menor o igual a 16' })
  age?: number; 

  @IsOptional()
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(0, { message: 'El peso debe ser mayor o igual a 0' })
  @Max(150, { message: 'El peso debe ser menor o igual a 116' })
  weight?: number; 

  @IsOptional()
  @IsNumber({}, { message: 'La altura debe ser un número' })
  @Min(0, { message: 'La altura debe ser mayor o igual a 0' })
  @Max(150, { message: 'La altura debe ser menor o igual a 2.6' })
  height?: number; 
}
