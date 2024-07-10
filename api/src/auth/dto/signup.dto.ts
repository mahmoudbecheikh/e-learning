import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  ScrumMaster = 'scrum_master',
  ProductOwner = 'product_owner',
  SimpleUser = 'simple_user',
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly nom: string;

  @IsNotEmpty()
  @IsString()
  readonly prenom: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly numtel: string;

  @IsNotEmpty()
  @IsString()
  readonly cin: string;

  // @IsNotEmpty()
  // @IsString()
  @IsOptional()
  readonly datelastcnx: Date;

  // @IsString()
  // @IsNotEmpty()
  // role: 'client' | 'employeur' | 'admin';

  @IsOptional()
  secteur?: string;

  @IsOptional()
  nomEntreprise?: string;

  @IsOptional()
  poste?: string;
}
