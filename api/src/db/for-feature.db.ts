import { Client, ClientSchema } from 'src/auth/schemas/user.schema';
import { Cours, CoursSchema } from 'src/module/cours/entities/cours.entity';
import { Formation, FormationSchema } from 'src/module/formation/schemas/formation.schema';
import { Forum, ForumSchema } from 'src/module/message/entities/forum.entity';
import { Message, MessageSchema } from 'src/module/message/entities/message.entity';

export default [{ name: Cours.name, schema: CoursSchema },
    { name: Message.name, schema: MessageSchema },
    { name: Client.name, schema: ClientSchema },
    { name: Formation.name, schema: FormationSchema },
    { name: Message.name, schema: MessageSchema },
    { name: Forum.name, schema: ForumSchema },

];