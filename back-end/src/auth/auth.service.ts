import { ForbiddenException, Injectable } from '@nestjs/common';
import { signInDto, signupDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private  prisma: PrismaService,private jwt: JwtService) {}


  async signup(signupDto: signupDto) {
     const hash = await argon.hash(signupDto.password);
     
     const user = await this.prisma.user.findUnique({
      where: { email: signupDto.email },
     });
     
     if (user) {
      throw new ForbiddenException("email already taken")
     }
     else {
      

     try {
      const user = await this.prisma.user.create({
        data: {
          full_name: signupDto.fullName,
          userName: signupDto.userName,
          password_hash: hash.trim(),
          email: signupDto.email,
        },
      });
      return {
        access_token: await this.signToken(user.id, user.email),
        user: user,
      }
   
  }
  catch (error) { 
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          `the ${error.meta.target} credential has been taken`,
        );
      }
    }
    throw error;
  }

}
}



async signToken(
    id: number,
    email: string,
  ): Promise<string> {
    const tokenData = {
      sub: id,
      email: email,
  
    };
    const token = await this.jwt.signAsync(tokenData, {
      secret: 'the way we do things',
      expiresIn: '1d', 
    });
    return token
  }


 async signIn(signInDto: signInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });
   
    if (!user) {
      throw new ForbiddenException('invalid credentials');
    }
    1
    const isPasswordValid = await argon.verify(
      user.password_hash, 
      signInDto.password
      );

    if (isPasswordValid) {
      delete user.password_hash;
      return {
        access_token: await this.signToken(user.id, user.email),
        user: user,
      }


    } else {
      throw new ForbiddenException('invalid credentials');
    }
  }
  




  async findOne(email: string) {
    const oneUser = await this.prisma.user.findUnique({
      where: {email : email},
  }
    
    ); 
 
    return oneUser;
  }


  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }
}