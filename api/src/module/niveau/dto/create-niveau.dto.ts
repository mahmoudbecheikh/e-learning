import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { CreateCourDto } from 'src/module/cours/dto/create-cours.dto';

export class CreateNiveauDto {
   

    @IsString()
    title:string;

    @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCourDto)
  cours: CreateCourDto[];
}