// import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { TutionModel } from "src/tution/entities/tution.entity";
import { UserModel } from "src/user/entities/user.entity";

@Schema()
export class Proposal {

    @Prop({ required: true, type: Types.ObjectId, ref: UserModel })
    user: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: TutionModel })
    tution: Types.ObjectId;

    @Prop({ default: 'pending' })
    status: string;

    @Prop({ required: true })
    amount: number;

}

export const ProposalSchema = SchemaFactory.createForClass(Proposal) 
export const ProposalModel = 'Proposal'
export type ProposalDocument = Proposal & Document
