import { IsNotEmpty, IsString } from 'class-validator'

export class signupDto {
    @IsNotEmpty()
    @IsString()
    userName: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()

    email: string;
    @IsNotEmpty()
    @IsString()
    fullName: string;
}


export class signInDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

