import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

  export class UpdateUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @IsOptional()
  first_name?: string | null;

  @IsOptional()
  last_name?: string | null;

  @IsOptional()
  @IsNotEmpty()
  password?: string | null;

  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
