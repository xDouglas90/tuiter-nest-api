import { IsNumber } from 'class-validator';

export class UpdateTuitDto {
  @IsNumber()
  likes: number;

  @IsNumber()
  retuits: number;
}
