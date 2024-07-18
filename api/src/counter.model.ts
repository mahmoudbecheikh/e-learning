/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const AutoIncrement = mongoose.Schema.autoIncrement;

@Schema()
export class Counter {
  @Prop()
  _id: string = 'sequence'; // Default ID for the counter document

  @Prop({ required: true })
  seqValue: number = 0; // Starting sequence value
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
CounterSchema.plugin(AutoIncrement, { inc_field: 'seqValue' }); // Apply auto-increment plugin

export default mongoose.model('Counter', CounterSchema); // Export the Counter model*/
