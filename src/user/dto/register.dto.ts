import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDTO {
  
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    userType: string;

    @IsInt()
    @IsNotEmpty()
    amount: number;
}