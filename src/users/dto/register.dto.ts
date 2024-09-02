import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ description: 'name' })
    @IsNotEmpty({ message: 'name is required.' })
    @IsString({ message: 'name must be a string.' })
    name: string;


    @ApiProperty({ description: 'email' })
    @IsNotEmpty({ message: 'email is required.' })
    @IsString({ message: 'email must be a string.' })
    @IsEmail({}, { message: 'email must be a valid email address.' })
    email: string;

    @ApiProperty({ description: 'password' })
    @IsNotEmpty({ message: 'password is required.' })
    @IsString({ message: 'password must be a string.' })
    password: string;
}
