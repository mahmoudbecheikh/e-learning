import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class changePassDto {
  @MinLength(7)
  @IsNotEmpty()
  @MaxLength(8)
  newPass: string;
  @IsNotEmpty()
  confirmNewPass: string;
}
