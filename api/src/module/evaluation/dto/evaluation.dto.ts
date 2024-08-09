import { IsNotEmpty } from "class-validator";

export class EvaluationDto {
   
   
  @IsNotEmpty()
    titre: string;

    description: string;

    question: string;

    
}