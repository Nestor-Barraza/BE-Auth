// loan.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Loan extends Document {
  @Prop()
  applicantName: string;

  @Prop()
  amount: number;

  @Prop()
  purpose: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
