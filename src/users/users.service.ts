import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { Role } from 'src/roles/entities/role.entity';
import { Status } from 'src/statuses/entities/status.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createProfileDto: CreateUserDto) {
    const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        ...createProfileDto,
        role: {
          id: RoleEnum.user,
        } as Role,
        status: {
          id: StatusEnum.inactive,
        } as Status,
        hash,
      }),
    );
    return {
      success : true,
      message : 'User created successfully',
      data : user
    }

  }
 async signUp(createProfileDto: CreateUserDto) {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersRepository.save(
      this.usersRepository.create({
        ...createProfileDto,
        password: createProfileDto.password,
        role: {
          id: RoleEnum.user,
        } as Role,
        status: {
          id: StatusEnum.inactive,
        } as Status,
        hash,
      }),
    );
    
    return {
      success : true,
      message : 'account created successfully',
      data : user
    }

  }
  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: string, updateProfileDto: UpdateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
