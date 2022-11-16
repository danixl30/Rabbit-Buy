import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Franchise } from 'src/franchise/infraestructure/models/franchise.model'
import { User } from 'src/user/infraestructure/models/user.model'
import { from, MUUID } from 'uuid-mongodb'

export type ProviderDocument = Provider & Document

@Schema()
export class Provider {
    @Prop({
        required: true,
        unique: true,
        type: 'object',
        ref: User.name,
        value: {
            type: 'Buffer',
        },
    })
    _id: MUUID

    @Prop({ required: true, ref: Franchise.name })
    franchise: string
}

export const ProviderSchema = SchemaFactory.createForClass(Provider)

ProviderSchema.set('id', false)

ProviderSchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
