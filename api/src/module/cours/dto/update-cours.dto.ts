import { PartialType } from '@nestjs/mapped-types';
import { CreateCourDto } from './create-cours.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCourDto extends PartialType(CreateCourDto) {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nom: string;

  // @IsString()
  // @MaxLength(30)
  // @IsNotEmpty()
  // readonly files: [File];

  files: any[];

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly dateCreation: string;
}
