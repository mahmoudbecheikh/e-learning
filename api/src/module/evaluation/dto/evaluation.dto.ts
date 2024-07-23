import { IsNotEmpty } from "class-validator";

export class EvaluationDto {
   
   
  @IsNotEmpty()
 
  text: string;


    
}