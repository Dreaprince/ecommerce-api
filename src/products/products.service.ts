import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}

  
  async createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      user: user
    });

    return await this.productRepository.save(product);
  }

  
  async updateProduct(id: number, updateProductDto: UpdateProductDto, userId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to update this product');
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  
  async deleteProduct(id: number, userId: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to delete this product');
    }

    await this.productRepository.remove(product);
  }

  
  async getApprovedProducts(): Promise<Product[]> {
    return await this.productRepository.find({ where: { isApproved: true } });
  }

  
  async getUserProducts(userId: number): Promise<Product[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId }, 
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.productRepository.find({
      where: { user: { id: userId } }, 
    });
  }

  
  async approveProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id }); 
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.isApproved = true;
    return await this.productRepository.save(product);
  }

  
  async disapproveProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id }); 
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.isApproved = false;
    return await this.productRepository.save(product);
  }
}
