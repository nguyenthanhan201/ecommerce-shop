import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  likes: number;

  @Prop()
  image01: string;

  @Prop()
  image02: string;

  @Prop()
  price: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  size: Array<string>;

  @Prop()
  categorySlug: string;

  @Prop()
  colors: Array<string>;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  views: number;

  @Prop()
  deletedAt?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  discount?: number;

  @Prop({ default: 0 })
  sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
