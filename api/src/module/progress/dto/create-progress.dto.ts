import { IsNotEmpty } from "class-validator";

export class CreateProgressDto {
    
    readonly user: string;
    readonly formation: string;
}
