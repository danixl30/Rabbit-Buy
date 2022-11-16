import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { from, MUUID } from 'uuid-mongodb'

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop({
        required: true,
        unique: true,
        type: 'object',
        value: {
            type: 'Buffer',
        },
    })
    _id: MUUID
    @Prop({ required: true })
    productName: string
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

ProductSchema.index({ name: 'text', productName: 'text', description: 'text' })

ProductSchema.set('id', false)

ProductSchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
