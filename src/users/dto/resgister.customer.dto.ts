import { Transform } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class SignupUserDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @IsNotEmpty()
  fullname: string | null;

  @IsNotEmpty()
  @MinLength(6)
  password: string | null;

  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
