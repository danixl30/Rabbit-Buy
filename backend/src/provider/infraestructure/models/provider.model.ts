import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Franchise } from 'src/franchise/infraestructure/models/franchise.model'
import { User } from 'src/user/infraestructure/models/user.model'

export type ProviderDocument = Provider & Document

@Schema()
export class Provider {
    @Prop({ required: true, unique: true, ref: User.name })
    _id: string

    @Prop({ required: true, ref: Franchise.name })
    franchise: string
}

export const ProviderSchema = SchemaFactory.createForClass(Provider)
