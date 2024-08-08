import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { Formation, FormationDocument } from '../formation/schemas/formation.schema';
import { Forum, ForumDocument } from './entities/forum.entity';
import { CreateForumDto } from './dto/create-forum.dto';

@Injectable()
export class MessageService {

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Formation.name) private readonly formationModel: Model<FormationDocument>,
    @InjectModel(Forum.name) private readonly forumModel: Model<Forum>,

  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message | null> {
    try {
      const user = await this.userModel.findOne({ email: createMessageDto.user }).exec();
      if (!user) {
        throw new Error('User not found');
      }

      const newMessage = await new this.messageModel({
        user: user._id,
        contenu: createMessageDto.contenu,
        date: createMessageDto.date,
      }).save();

      const forum = await this.forumModel.findByIdAndUpdate(
        createMessageDto.forum,
        { $push: { messages: newMessage } },
        { new: true }
      ).exec();

      if (!forum) {
        throw new Error('Forum not found');
      }

      return newMessage.populate('user');
    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }


  async createForum(createForum: CreateForumDto): Promise<Forum | null> {
    try {

      const user = await this.userModel.findOne({ email: createForum.user }).exec();
      if (!user) {
        throw new Error('User not found');
      }
      const formation = await this.formationModel.findById(createForum.formation).exec();
      if (!formation) {
        throw new Error('Formation not found');
      }

      return (await new this.forumModel({
        formation: formation._id,
        user: user._id,
        messages: []
      }).save()).populate({
        path: 'messages',
        populate: {
          path: 'user',
          model: 'User',
        },
      });;

    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }



  async findAll(): Promise<Forum[]> {
    return this.forumModel.find().populate([
      {
        path: 'user',
        model: 'User',
      },
      {
        path: 'messages',
        populate: {
          path: 'user',
          model: 'User',
        },
      },
      {
        path: 'formation',
        model: 'Formation',
      },
    ]);
  }

  async findForum(idClient: string, idFormation: string): Promise<Forum> {
    const forum = await this.forumModel.findOne({ user: idClient, formation: idFormation });
    if (forum)
      return forum.populate({
        path: 'messages',
        populate: {
          path: 'user',
          model: 'User',
        },
      });
    return null
  }

  async findForumById(id: string): Promise<Forum> {
    const forum = (await this.forumModel.findById(id));
    if (forum)
      return forum.populate([
        {
          path: 'messages',
          populate: {
            path: 'user',
            model: 'User',
          },
        },
        {
          path: 'formation',
          model: 'Formation',
        },
      ]);
    return null
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
