import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Franchise } from 'src/franchise/infraestructure/models/franchise.model'
import { User } from 'src/user/infraestructure/models/user.model'
import { from, MUUID } from 'uuid-mongodb'

export type ChatDocument = Chat & Document

@Schema()
export class Chat {
    @Prop({
        required: true,
        unique: true,
        type: 'object',
        value: {
            type: 'Buffer',
        },
    })
    _id: MUUID

    @Prop({ required: true, ref: Franchise.name })
    franchise: string

    @Prop({ required: true, ref: User.name })
    client: string

    @Prop({ required: true })
    timestamp: Date

    @Prop({ required: true })
    messages: string[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat)

ChatSchema.set('id', false)

ChatSchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
