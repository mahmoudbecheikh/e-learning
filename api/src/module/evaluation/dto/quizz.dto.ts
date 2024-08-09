import { IsString, IsNotEmpty } from 'class-validator';

export class QuizzDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  option1: string;

  @IsString()
  @IsNotEmpty()
  option2: string;

  @IsString()
  @IsNotEmpty()
  option3: string;

  @IsString()
  @IsNotEmpty()
  option4: string;

  @IsString()
  @IsNotEmpty()
  correctOption: string;
}
