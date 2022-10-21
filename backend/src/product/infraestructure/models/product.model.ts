import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop({ required: true, unique: true })
    _id: string
    @Prop({ required: true })
    name: string
    @Prop({ default: '' })
    description: string
    @Prop({ required: true })
    price: number
    @Prop({ required: true })
    currency: string
    @Prop({ required: true })
    existence: number
    @Prop()
    image: string
    @Prop({ default: [] })
    categories: string[]
    @Prop({ required: true })
    franchise: string
    @Prop({ required: true, default: new Date() })
    dateAdded: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
