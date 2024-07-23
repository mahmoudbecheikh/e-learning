import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';
import { Client, User, UserDocument } from 'src/auth/schemas/user.schema';
import { Formation, FormationDocument } from '../formation/schemas/formation.schema';
import { Forum, ForumDocument } from './entities/forum.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Formation.name) private readonly formationModel: Model<FormationDocument>,
    @InjectModel(Forum.name) private readonly forumModel: Model<ForumDocument>,

  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message | null> {
    try {
        const user = await this.clientModel.findOne({ email: createMessageDto.user }).exec();
        if (!user) {
            throw new Error('User not found');
        }

        let forum = await this.forumModel.findOne({ formation: createMessageDto.formation, user: user._id }).exec();
        if (!forum) {
            const formation = await this.formationModel.findById(createMessageDto.formation).exec();
            if (!formation) {
                throw new Error('Formation not found');
            }

            forum = new this.forumModel({
                formation: formation._id,
                user: user._id,
                messages: []
            });
        }

        const newMessage = new this.messageModel({
            user: user._id,
            contenu: createMessageDto.contenu,
            date: createMessageDto.date,
        });

        forum.messages.push(newMessage);

        await forum.save();
        await newMessage.save();

        return newMessage.populate('user');
    } catch (error) {
        console.error('Error creating message:', error);
        return null;
    }
}



  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }


  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
