import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { from, MUUID } from 'uuid-mongodb'

export type FranchiseDocument = Franchise & Document

@Schema()
export class Franchise {
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

    @Prop({ required: true, unique: true })
    rif: string

    @Prop({ required: true })
    groupId: string

    @Prop({ required: true })
    image: string
}

export const FranchiseSchema = SchemaFactory.createForClass(Franchise)

FranchiseSchema.set('id', false)

FranchiseSchema.virtual('id')
    .get(function (): string {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
