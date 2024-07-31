import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { Cours, CoursSchema } from 'src/module/cours/entities/cours.entity';
import { Formation, FormationSchema } from 'src/module/formation/schemas/formation.schema';
import { Forum, ForumSchema } from 'src/module/message/entities/forum.entity';
import { Message, MessageSchema } from 'src/module/message/entities/message.entity';
import { Progress, ProgressSchema } from 'src/module/progress/entities/progress.entity';

export default [{ name: Cours.name, schema: CoursSchema },
{ name: Message.name, schema: MessageSchema },
{ name: User.name, schema: UserSchema },
{ name: Formation.name, schema: FormationSchema },
{ name: Message.name, schema: MessageSchema },
{ name: Forum.name, schema: ForumSchema },
{ name: Progress.name, schema: ProgressSchema },

];