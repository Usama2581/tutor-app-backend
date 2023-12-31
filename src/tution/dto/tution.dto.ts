import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class TutionDto {

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    school: string;
    
    @IsNotEmpty()
    @IsString()
    class: string;
    
    @IsNotEmpty()
    @IsString()
    user: string; // Assuming you want to pass the user ID as a string
    
    @IsNotEmpty()
    @IsNumber()
    fee: number;
    
    // @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    commission?: number;
    
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    location: string;
}
