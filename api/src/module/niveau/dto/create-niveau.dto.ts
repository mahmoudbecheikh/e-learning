import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { CreateCourDto } from 'src/module/cours/dto/create-cours.dto';
import { CreateFormationDto } from 'src/module/formation/dto/create-formation.dto';

export class CreateNiveauDto {
   

    @IsString()
    title:string;

    @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCourDto)
  cours: CreateCourDto[];

  formationTitle: string; 

}