import {
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateTuitDto {
  @IsString()
  content: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({
    each: true,
  })
  user: CreateUserDto;
}
