import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateNiveauDto {
    @IsString()
    @IsOptional()
    title?:string

/*    @IsString()
    formationId?: string;*/
}