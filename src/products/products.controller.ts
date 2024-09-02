import { Controller, Post, Get, Delete, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth() 
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product successfully created', type: Product })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req): Promise<Product> {
    const userId = req.decoded.id;
    return this.productService.createProduct(createProductDto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', description: 'ID of the product to update', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product successfully updated', type: Product })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @Req() req): Promise<Product> {
    const userId = req.decoded.id;
    return this.productService.updateProduct(id, updateProductDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete', type: Number })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.decoded.id;
    return this.productService.deleteProduct(id, userId);
  }

  @Get('approved')
  @ApiOperation({ summary: 'Get all approved products' })
  @ApiResponse({ status: 200, description: 'List of approved products', type: [Product] })
  async getApprovedProducts(): Promise<Product[]> {
    return this.productService.getApprovedProducts();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get products of the current user' })
  @ApiResponse({ status: 200, description: 'List of products belonging to the user', type: [Product] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserProducts(@Req() req): Promise<Product[]> {
    const userId = req.decoded.id;
    return this.productService.getUserProducts(userId);
  }

  @Post('approve/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Approve a product' })
  @ApiParam({ name: 'id', description: 'ID of the product to approve', type: Number })
  @ApiResponse({ status: 200, description: 'Product successfully approved', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async approveProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.approveProduct(id);
  }

  @Post('disapprove/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Disapprove a product' })
  @ApiParam({ name: 'id', description: 'ID of the product to disapprove', type: Number })
  @ApiResponse({ status: 200, description: 'Product successfully disapproved', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async disapproveProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.disapproveProduct(id);
  }
}

