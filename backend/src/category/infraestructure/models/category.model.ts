import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { from, MUUID } from 'uuid-mongodb'

export type CategoryDocument = Document & Category

@Schema()
export class Category {
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
    name: string
    @Prop({ default: [] })
    childs: string[]
    @Prop({ default: '' })
    parent: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.set('id', false)

CategorySchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
