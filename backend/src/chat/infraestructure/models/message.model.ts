import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { User } from 'src/user/infraestructure/models/user.model'
import { from, MUUID } from 'uuid-mongodb'
import { Chat } from './chat.model'

export type MessageDocument = Message & Document

@Schema()
export class Message {
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
    timestamp: Date

    @Prop({ required: true, ref: Chat.name })
    chat: string

    @Prop({ required: true, ref: User.name })
    from: string

    @Prop({ required: true })
    body: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)

MessageSchema.set('id', false)

MessageSchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
