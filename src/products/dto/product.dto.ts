import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'A description of the product',
    example: 'A high-performance laptop with 16GB RAM and 512GB SSD',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'The quantity of the product available',
    example: 10,
  })
  @IsNumber()
  readonly quantity: number;

  @ApiPropertyOptional({
    description: 'Whether the product is approved or not',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isApproved?: boolean; 
}

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiPropertyOptional({
    description: 'A description of the product',
    example: 'A high-performance laptop with 16GB RAM and 512GB SSD',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'The quantity of the product available',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  readonly quantity?: number;

  @ApiPropertyOptional({
    description: 'Whether the product is approved or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isApproved?: boolean;
}
