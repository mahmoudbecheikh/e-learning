import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class ReponseDto {   
  
  @IsNotEmpty()
    text: string; 

    @IsOptional()
  user: User; 
} 