import { Controller, Post, Body, Res, Req, Param, Get, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import {CookiGetter} from '../decorators/cookie_getter.decorator'
import { SignInDto } from 'src/admin/dto/signIn.dto';
import { CookieGetter } from 'src/admin/dto/cookie-getter.decorator';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpAgainDto } from './dto/otp-again.dto';
import { SelfGuard } from 'src/guards/self.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //      Admin 

  // ===== SignUp =====
  @Post('signup')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp1(createAdminDto, res);
  }

  // ====== SignIn ======
  @Post('signin')
  async signInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn1(signInDto, res);
  }

  // ===== SignOut ======
  @Post('signout')
  async signOut1(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut1(refresh_token, res);
  }

  // ===== Refresh Token ======
  @Post('refresh')
  async refreshAdminToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken1(refresh_token, res);
  }

  //=========================================================================

  // >>>>>>>>>>>>>>>>>>>> User Auth  <<<<<<<<<<<<<<<<<<<<<<<

  @Post('signup_users')
  async signUpUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp2(createUserDto, res);
  }

  @HttpCode(200)
  @Post('verify_otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @HttpCode(200)
  @Post('sent_again_otp')
  async sendAgainOtp(@Body() sendOtpAgainDto: SendOtpAgainDto) {
    return this.authService.sendOtpAgain(sendOtpAgainDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('signin_users') 
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn2(signInDto, res);
  }

  @UseGuards(SelfGuard)
  @HttpCode(200)
  @Post('signout_users')
  async signOutUser(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut2(refresh_token, res);
  }

  @UseGuards(SelfGuard)
  @HttpCode(200)
  @Post('refresh_users')
  async refreshUserToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken2(refresh_token, res);
  }

}
