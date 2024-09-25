import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Schema as MongooseSchema, Types} from "mongoose";


export type ReponseDocument = Reponse & Document;

@Schema()
export class Reponse {

    @Prop()
    text: string;
 
  
    @Prop({ type: Types.ObjectId, ref: 'Evaluation' })
  evaluationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quizz' })
  quizId: Types.ObjectId;

  @Prop()
  selectedOption: string;

  @Prop()
  isCorrect: boolean;
  

}

export const ReponseSchema = SchemaFactory.createForClass(Reponse);

// remarque : kifesh bsh tsir l 7keya maa l quizz : 
// fel quizz wa9t yselectionni une option aka l option tetzed fi reponse yaani reponse= option1 ou reponse=option2 ou reponse=option3 ou reponse=option4
// w pour valider est ce qu'elle est correcte : tsir comparaison bin l valaur mtaa l réponse w l valeur mtaa option correcte 