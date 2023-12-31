import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { CommisionModel } from "src/commision/entities/commision.entity";
import { UserModel } from "src/user/entities/user.entity";

@Schema({
    timestamps: true
})

export class Tution {

    @Prop({ required: true, type: Types.ObjectId, ref: UserModel })
    user: Types.ObjectId;

    @Prop({ required: true })
    commision: number;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    fee: number;

    @Prop({ default: 'pending' })
    status: string;

    @Prop({ required: true })
    location: string;

}

export const TutionSchema = SchemaFactory.createForClass(Tution)
export const TutionModel = 'Tution'
export type TutionDocument = Tution & Document