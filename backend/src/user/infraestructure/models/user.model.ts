import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Roles } from 'src/user/domain/value-objects/roles'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    _id: string
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
