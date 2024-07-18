import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
// import { File } from '../entities/cours.entity';
export class CreateCourDto {
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
