// src/users/users.controller.ts

import { Controller, Post, Body, Get, Param, Put, Req, UseGuards, Query, Logger, UnauthorizedException } from '@nestjs/common';
import { Response, UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto): Promise<Response> {
    return this.usersService.login(loginDto);
  }

  @Get('find-one')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiResponse({ status: 200, description: 'User found successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Query('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Get('find-all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, description: 'List of users found successfully.' })
  async findAll() {
    return this.usersService.findAll();
  }


  @Put('ban/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200, description: 'User successfully banned.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async banUser(@Param('id') id: number, @Req() req: any) {
    const userRole = req?.decoded?.role;

    if (userRole !== 'admin') {
      Logger.warn(`Unauthorized attempt to ban user with ID ${id} by user with role ${userRole}`);
      throw new UnauthorizedException('Only admins can ban users.');
    }

    return this.usersService.banUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('unban/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Unban a user' })
  @ApiResponse({ status: 200, description: 'User successfully unbanned.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async unbanUser(@Param('id') id: number, @Req() req: any) {
    const userRole = req?.decoded?.role;

    if (userRole !== 'admin') {
      Logger.warn(`Unauthorized attempt to ban user with ID ${id} by user with role ${userRole}`);
      throw new UnauthorizedException('Only admins can ban users.');
    }
    return this.usersService.unbanUser(id);
  }
}


