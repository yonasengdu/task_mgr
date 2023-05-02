import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Res, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signupDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() signupDto: signupDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signup(signupDto);
    res.cookie('access_token', token.access_token, { httpOnly: true });
    return token
  }


  @Post('signIn')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(@Body() signInDto: signInDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn(signInDto);
    res.cookie('access_token', token.access_token, { httpOnly: true });
    return token
    
  }


  @Get("allUsers")
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll() {
    return this.authService.findAll();
  }
}
