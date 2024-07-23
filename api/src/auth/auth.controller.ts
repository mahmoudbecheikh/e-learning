import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put, BadRequestException, UseGuards, HttpException, HttpStatus, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard } from './utils/LocalGuard';
import { AllowAllGuard } from './utils/AllowAllGuard';
import {getUser } from './decorator/get-user.decorator';
import { JwtAuthGuard } from './guard/JwtAuthGuard';
import {User } from './schemas/user.schema';
import { changePassDto } from './dto/changePass.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { EditProfileDto } from './dto/EditProfile.dto';


interface FileParams {
  fileName: string;
}


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // Injecter JwtService
  ) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>): Promise<{ id: string, token: string }> {
    const user = await this.authService.login(loginDto);
    if (!session) {
      throw new HttpException('Session is not initialized', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    session.token = user.token;
    session.userId = user.id;
    return user;
  }

  @Get("/users")
  findAll() {
    return this.authService.findAll();
  }

  @Get("users/:id")
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Put("put/:id")
  update(@Param('id') id: string, @Body() body: SignUpDto) {
    return this.authService.update(id, body);
  }


  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.authService.delete(id);
  }
  

  @Get("/usermail/:email")
  findEmail(@Param('email') email: string) {
    return this.authService.findByEmail(email);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.authService.findOneById(id);
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Session() session: Record<string, any>) {
    if (session.authenticated) {
      return { authenticated: true, userId: session.userId };
    } else {
      return { authenticated: false };
    }
  }

  @Post('/logout')
  async logout(@Session() session: Record<string, any>): Promise<{ message: string }> {
    try {
      session.blacklistedTokens = session.blacklistedTokens || [];
      session.blacklistedTokens.push(session.token);
      session.token = null;
      session.userId = null;
      session.authenticated = false;
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error during logout:', error);
      return { message: 'Logout failed' };
    }
  }

  @Put('/users/update/:id')
  async updateUser(@Param('id') id: string, @Body() body: EditProfileDto): Promise<User> {
    try {
      return await this.authService.updateProfile(id, body);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@getUser() user: User) {
    return { user };
  }

  @UseGuards(AllowAllGuard)
  @Get('/userId')
  getUserId(@getUser() user: User) {
    return user._id;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/changePass')
  async changePass(@Body() changePassDto: changePassDto, @getUser() user: User) {
    try {
      const updatedUser = await this.authService.changePass(changePassDto, user);

      return { message: 'Password changed successfully', user: updatedUser};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateUserValue(@Param('id') id: string, @Body() updatedFields: Record<string, any>): Promise<User> {
    return this.authService.updateUserValue(id, updatedFields);
  }


  //add client
  @Post('/user')
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.authService.addUser(userData);
  }

  //find all users
  @Get('/allusers')
  async GetAllUsers(){
    return this.authService.findUsers();
  }
  
  @Get('/client')
  async getClients(): Promise<User[]> {
    return this.authService.findClients();
  }

  @Get('/employeur')
  async getEmployeurs(): Promise<User[]> {
    return this.authService.findEmployeurs();
  }


  @Get('/admin')
  async getAdmins(): Promise<User[]> {
    return this.authService.findAdmins();
  }

@Post('/reset-password-request')
  async requestPasswordReset(@Body('email') email: string): Promise<void> {
    return this.authService.requestPasswordReset(email);
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ): Promise<void> {
    return this.authService.resetPassword(token, password);
  }


}
