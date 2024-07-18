import { IsString, IsInt } from 'class-validator';

export class CreateNiveauDto {
   

    @IsString()
    title:String
}