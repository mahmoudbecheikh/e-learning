
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateFormationDto {
  @IsString()
  @IsOptional()
  formationId?: string;

  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  objectif?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  competenceAquises?: string;

  @IsString()
  @IsOptional()
  resultatSouhaites?: string;

  @IsInt()
  @IsOptional()
  nbrNiveau?: number;
}
