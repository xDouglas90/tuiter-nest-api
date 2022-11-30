import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateTuitDto } from 'src/tuits/dto/create-tuit.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Name only can contain letters and spaces',
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Email is not valid',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+$/, {
    message: 'Username only can contain letters, numbers and _ . - +',
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, {
    message: 'Date is not valid, must be in format dd/mm/yyyy',
  })
  readonly birthdate: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?(?:\d{4,5}\-?\d{4})$/, {
    message: 'Phone is not valid',
  })
  readonly phone: string;

  @IsBoolean()
  readonly isVerified: boolean;

  @IsBoolean()
  readonly isPrivate: boolean;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  readonly tuits: CreateTuitDto[];
}
