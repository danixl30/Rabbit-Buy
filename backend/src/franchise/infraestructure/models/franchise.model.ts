import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FranchiseDocument = Franchise & Document

@Schema()
export class Franchise {
    @Prop({ required: true })
    _id: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    rif: string

    @Prop({ required: true })
    groupId: string
}

export const FranchiseSchema = SchemaFactory.createForClass(Franchise)
