
import { IsString, IsInt } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  formationId: string;

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
}
