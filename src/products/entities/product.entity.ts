import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @ManyToOne(() => User, user => user.products)
  user: User;
}
