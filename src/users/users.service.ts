import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface Response {
  statusCode: string;
  message: string;
  data: any; // Use a more specific type if needed
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService, 
  ) {}

  async register(registerDto: RegisterDto): Promise<Response> {
    const { email, password, name, role } = registerDto;

    // Check if the email already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    const savedUser = await this.usersRepository.save(user);

    // Exclude password from the returned user object
    const { password: _, ...userWithoutPassword } = savedUser;
    return {
      statusCode: '00',
      message: 'User registered successfully',
      data: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto): Promise<Response> {
    const { email, password } = loginDto;

    // Fetch user by email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

     // Check if the user is banned
     if (user.isBanned) {
        throw new UnauthorizedException('User is banned');
      }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create JWT payload
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = sign(payload, this.configService.get<string>('JWT_SECRET'), { expiresIn: '1d' });

    // Return response
    return {
      statusCode: '00',
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    };
  }

  async findOne(email: string): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: {email} });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      statusCode: '00',
      message: 'User found successfully',
      data: user,
    };
  }

  async banUser(id: number): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.isBanned = true; 
    const updatedUser = await this.usersRepository.save(user); 
    return {
      statusCode: '00',
      message: 'User banned successfully',
      data: updatedUser,
    };
  }

  async unbanUser(id: number): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.isBanned = false; 
   const updatedUser = await this.usersRepository.save(user);
    return {
      statusCode: '00',
      message: 'User unbanned successfully',
      data: updatedUser,
    };
  }

  async findAll(): Promise<Response> {
    try {
      const users = await this.usersRepository.find();
      return {
        statusCode: '00',
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      console.error('Error occurred while fetching users: ', error);
      throw error;
    }
  }
}
