import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsString, Matches } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
    message: 'Avatar is not valid',
  })
  @IsEmpty()
  readonly avatar?: string;

  @IsString()
  @IsEmpty()
  readonly bio?: string;

  @IsString()
  @IsEmpty()
  readonly location?: string;

  @IsString()
  @IsEmpty()
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
    message: 'Website is not valid',
  })
  readonly website?: string;

  @IsString()
  @IsEmpty()
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
    message: 'Cover is not valid',
  })
  readonly cover?: string;
}
