import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();

// Declaration merging
declare global {
  namespace Express {
    interface Request {
      decoded?: any;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
  
    const [scheme, token] = authHeader.split(' ');
  
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException('Invalid token');
      } else {
        req.decoded = decoded;
        //this.logUserActivity(req); 
        next();
      }
    });
  }

}



