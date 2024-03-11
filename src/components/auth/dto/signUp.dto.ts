import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/constants/role-type';

export default class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly password: string;

  @ApiProperty({
    type: String,
    enum: RoleType,
    default: RoleType.USER,
  })
  @IsEnum(RoleType)
  readonly role: RoleType;
}
