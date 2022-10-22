import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Franchise } from 'src/franchise/infraestructure/models/franchise.model'
import { Statuses } from 'src/petition/domain/value-objects/statuses'

export type PetitionDocument = Petition & Document

@Schema()
export class Petition {
    @Prop({ required: true, unique: true })
    _id: string
    @Prop({ required: true })
    productName: string
    @Prop({ required: true })
    productId: string
    @Prop({ required: true })
    status: Statuses
    @Prop({ required: true })
    productPrice: number
    @Prop({ required: true })
    productCurrency: string
    @Prop({ required: true })
    quantiny: number
    @Prop({ required: true })
    client: string
    @Prop({ required: true })
    date: Date
    @Prop({ required: true, ref: Franchise.name })
    franchise: string
}

export const PetitionSchema = SchemaFactory.createForClass(Petition)
