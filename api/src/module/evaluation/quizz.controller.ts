import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzDto } from './dto/quizz.dto';


@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Post()
  async create(@Body() createQuizzDto: QuizzDto) {
    return this.quizzService.createQuizz(createQuizzDto);
  }

  @Get()
  async findAll() {
    return this.quizzService.findAllQuizz();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quizzService.findQuizzById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createQuizzDto: QuizzDto,
  ) {
    return this.quizzService.updateQuizz(id, createQuizzDto);
  }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.quizzService.removeQuizz(id);
//   }

  @Delete("/:id")
    Delete( @Param('id') id: string) {
        return this.quizzService.Delete(id);
    }

  // @Post(':niveauId')
  // async addQuizzToNiveau(@Param('niveauId') niveauId: string, @Body() quizzDto: QuizzDto) {
  //   try {
  //     return await this.quizzService.addQuizzToNiveau(niveauId, quizzDto);
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }


  @Post(':niveauId')
async addQuizzToNiveau(@Param('niveauId') niveauId: string, @Body() quizzDto: QuizzDto) {
  try {
    return await this.quizzService.addQuizzToNiveau(niveauId, quizzDto);
  } catch (error) {
    throw new NotFoundException(error.message);
  }
}



  @Get('/niveau/:niveauId')
  async getQuizzByNiveau(@Param('niveauId') niveauId: string) {
    try {
      return await this.quizzService.getQuizzByNiveau(niveauId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


}
