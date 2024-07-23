import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, validate } from 'class-validator';
import { Role } from './signup.dto';


export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly nom: string;

  @IsNotEmpty()
  @IsString()
  readonly prenom: string;

  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  readonly password?: string; // Rendre le champ password optionnel

  @IsNotEmpty()
  @IsString()
  readonly numtel: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cin: string;

  
  @IsNotEmpty()
  @IsString()
  readonly datelastcnx: Date;

  async validatePassword(): Promise<string[]> {
    if (!this.password) {
      return [];
    }
    const errors = await validate(this);
    return errors.map(error => Object.values(error.constraints)).flat();
  }
}
