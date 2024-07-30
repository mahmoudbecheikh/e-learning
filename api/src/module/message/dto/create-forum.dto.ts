import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateForumDto {
    @IsNotEmpty()
    readonly user: string;

    @IsNotEmpty()
    readonly formation: string;

  
}
