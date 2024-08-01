import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { CreateNiveauDto } from 'src/module/niveau/dto/create-niveau.dto';

export class CreateFormationDto {
 

  @IsString()
  titre: string;

  @IsString()
  objectif: string;

  @IsString()
  description: string;

  @IsString()
  competenceAquises: string;

  @IsString()
  resultatSouhaites: string;

  @IsInt()
  nbrNiveau: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNiveauDto)
  niveau: CreateNiveauDto[];
}
