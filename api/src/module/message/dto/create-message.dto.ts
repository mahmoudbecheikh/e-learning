import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
// import { File } from '../entities/cours.entity';
export class CreateMessageDto {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly contenu: string;

    @IsNotEmpty()
    readonly user: string;

    @IsNotEmpty()
    readonly formation: string;

    @IsNotEmpty()
    readonly forum: string;

    @IsNotEmpty()
    readonly date: string;
}
