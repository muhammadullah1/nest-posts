import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class AuthUpdateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  first_name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  last_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;
}
