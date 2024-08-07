import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EvaluationsService } from './evaluation.service';
import { EvaluationDto } from './dto/evaluation.dto';

@Controller('evaluations')
export class EvaluationsController {
    constructor(private readonly service : EvaluationsService) {};
    
    @Delete('/all')
    DeleteAll() {
        return this.service.DeleteAll();
    }
     
    @Post()
    Add( @Body() Body: EvaluationDto) {
        return this.service.Add(Body);
    }

    @Get()
    FinAll() {
        return this.service.FinAll();
    }

    @Get("/:id")
    FindById( @Param('id') id: string) {
        return this.service.FindById(id);
    }

    
    @Put("/:id")
    Update( @Param('id') id: string , @Body() body: EvaluationDto) {
        return this.service.Update(id , body);
    }

    @Delete("/:id")
    Delete( @Param('id') id: string) {
        return this.service.Delete(id);
    }

    

  @Post(':niveauId')
  async addEvaluationToNiveau(@Param('niveauId') niveauId: string, @Body() evaluationDto: EvaluationDto) {
    try {
      return await this.service.addEvaluationToNiveau(niveauId, evaluationDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }



  @Get('/niveau/:niveauId')
  async getEvaluationsByNiveau(@Param('niveauId') niveauId: string) {
    try {
      return await this.service.getEvaluationsByNiveau(niveauId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
    
}

