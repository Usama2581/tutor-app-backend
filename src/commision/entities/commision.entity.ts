import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Commision {

    @Prop({ required: true })
    percentage: number;
}



export const CommisionSchema = SchemaFactory.createForClass(Commision) 
export const CommisionModel = 'Commision'
export type CommisionDocument = Commision & Document

