import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateForumDto } from './dto/create-forum.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Post('/forum')
  createForum(@Body() createForumDto: CreateForumDto) {
    return this.messageService.createForum(createForumDto);
  }

  @Get('forums')
  async getAll() {
    return this.messageService.findAll();
  }
  @Get()
  findByForum(@Body() data: any,
    @Query('idClient') idClient: string,
    @Query('idFormation') idFormation: string,) {
    return this.messageService.findForum(idClient,idFormation);
  }
  

  @Get(':id')
  async GetById(@Param('id') id: string) {
    return this.messageService.findForumById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
