import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Roles } from 'src/user/domain/value-objects/roles'
import { MUUID, from } from 'uuid-mongodb'

export type UserDocument = User & Document

@Schema()
export class User {
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
    @Prop({ unique: true, required: true })
    email: string
    @Prop({ required: true })
    password: string
    @Prop({ required: true })
    role: Roles
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('id', false)

UserSchema.virtual('id')
    .get(function () {
        return from(this._id).toString()
    })
    .set(function (value: string) {
        this._id = from(value)
    })
