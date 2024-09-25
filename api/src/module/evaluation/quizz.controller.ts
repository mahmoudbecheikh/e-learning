import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException, Req } from '@nestjs/common';
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


  // @Post(':quizzId/submit')
  // async submitQuizzResponse(
  //   @Param('quizzId') quizzId: string,
  //   @Body('userId') userId: string,
  //   @Body('selectedOption') selectedOption: string
  // ) {
  //   try {
  //     return await this.quizzService.submitQuizzResponse(quizzId, userId, selectedOption);
  //   } catch (error) {
  //     if (error instanceof NotFoundException || error instanceof BadRequestException) {
  //       throw error;
  //     }
  //     throw new Error('Une erreur est survenue lors de la soumission de votre réponse.');
  //   }
  // }


  @Post('/reponse/:quizId/:userId')
  async submitQuizzResponse(
    @Param('quizId') quizId: string,
    @Body() responseDto: { selectedOption: string },
    // @Req() req,
    @Param('userId') userId: string
  ) {
    // const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié
    return this.quizzService.saveQuizResponse(quizId, userId, responseDto.selectedOption);
  } 


//   @Post('/reponse/:quizId')
//   async submitQuizzResponse(
//     @Param('quizId') quizId: string,
//     @Body() responseDto: { selectedOption: string },
//     @ReqUser() user: User,
// ): Promise<Reponse>{
//     return this.quizzService.saveQuizResponse(quizId, responseDto.selectedOption, user);
//   }

}
