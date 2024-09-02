// src/users/users.controller.ts

import { Controller, Post, Body, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


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
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Put('ban/:id')
  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200, description: 'User successfully banned.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async banUser(@Param('id') id: number) {
    return this.usersService.banUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Put('unban/:id')
  @ApiOperation({ summary: 'Unban a user' })
  @ApiResponse({ status: 200, description: 'User successfully unbanned.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async unbanUser(@Param('id') id: number) {
    return this.usersService.unbanUser(id);
  }
}


