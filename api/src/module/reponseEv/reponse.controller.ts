// import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
// import { ReponsesService } from './reponse.service';
// import { ReponseDto } from './dto/reponse.dto';
// import { ReqUser } from 'src/auth/req-user.decorator';
// import { User } from 'src/auth/schemas/user.schema';

// @Controller('reponses')
// export class ReponsesController {
//     constructor(private readonly service : ReponsesService) {};
    
//     @Delete('/all')
//     DeleteAll() {
//         return this.service.DeleteAll();
//     }
     
//     @Post()
//     Add( @Body() Body: ReponseDto) {
//         return this.service.Add(Body);
//     }

//     @Get()
//     FinAll() {
//         return this.service.FinAll();
//     }

//     @Get("/:id")
//     FindById( @Param('id') id: string) {
//         return this.service.FindById(id);
//     }

    
//     @Put("/:id")
//     Update( @Param('id') id: string , @Body() body: ReponseDto) {
//         return this.service.Update(id , body);
//     }

//     @Delete("/:id")
//     Delete( @Param('id') id: string) {
//         return this.service.Delete(id);
//     }

     

//   // @Post(':evaluationId')
//   // async addReponseToEvaluation(@Param('evaluationId') evaluationId: string, @Body() reponseDto: ReponseDto) {
//   //   try {
//   //     return await this.service.addReponseToEvaluation(evaluationId, reponseDto);
//   //   } catch (error) {
//   //     throw new NotFoundException(error.message);
//   //   }
//   // }

//   @Post(':evaluationId')
//   async addReponseToEvaluation(
//     @Param('evaluationId') evaluationId: string,
//     @Body() reponseDto: ReponseDto,
//     @ReqUser() user: User // Ajout de l'utilisateur connecté
//   ) {
//     try {
//       return await this.service.addReponseToEvaluation(evaluationId, reponseDto, user);
//     } catch (error) {
//       throw new NotFoundException(error.message);
//     }
//   }



//   @Get('/evaluation/:evaluationId')
//   async getReponsesByEvaluation(@Param('evaluationId') evaluationId: string) {
//     try {
//       return await this.service.getReponsesByEvaluation(evaluationId);
//     } catch (error) {
//       throw new NotFoundException(error.message);
//     }
//   }
    
// }



import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ReponsesService } from './reponse.service';
import { ReponseDto } from './dto/reponse.dto';
import { ReqUser } from 'src/auth/req-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuthGuard';
import { Reponse } from './model/reponse.models';
import { Types } from 'mongoose';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User; // Ajoutez la propriété user
//     }
//   }
// } 

@Controller('reponses')
export class ReponsesController {
  constructor(private readonly service: ReponsesService) {}

  @Delete('/all')
  DeleteAll() {
    return this.service.DeleteAll();
  }

  @Post()
  Add(@Body() Body: ReponseDto) {
    return this.service.Add(Body);
  }

  @Get()
  FinAll() {
    return this.service.FinAll();
  }

  @Get('/:id')
  FindById(@Param('id') id: string) {
    return this.service.FindById(id);
  }

  @Put('/:id')
  Update(@Param('id') id: string, @Body() body: ReponseDto) {
    return this.service.Update(id, body);
  }

  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.service.Delete(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('/:evaluationId')
async addReponseToEvaluation(
  @Param('evaluationId') evaluationId: string,
  @Body() reponseDto: ReponseDto,
  @ReqUser() user: User,
): Promise<Reponse> {
  return this.service.addReponseToEvaluation(evaluationId, reponseDto, user);
}


// @Get('/byEvaluationAndUser')
//     async getReponsesByEvaluationAndUser(
//         @Query('evaluationId') evaluationId: string,
//         @Query('userId') userId: string
//     ) {
//         return this.service.getReponsesByEvaluationAndUser(evaluationId, userId);
//     }


// @Get('/getByEvaluationAndUser')
// async getReponsesByEvaluationAndUser(
//   @Query('evaluationId') evaluationId: string,
//   @Query('userId') userId: string
// ) {
//   const evaluationObjectId = new Types.ObjectId(evaluationId);
//   const userObjectId = new Types.ObjectId(userId);
  
//   return this.service.getReponsesByEvaluationAndUser(
//     evaluationObjectId.toString(),  // Conversion en string
//     userObjectId.toString()         // Conversion en string
//   );
// }


@Get('/user/:userId')
  async getReponsesByUser(@Param('userId') userId: string) {
    try {
      return await this.service.getReponsesByUser(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }



@Get('/evaluationanduser/:evaluationId')
async getReponsesByEvaluationAndUser(
  @Param('evaluationId') evaluationId: string,
  @Request() req: any // Ajoutez ce paramètre pour accéder à la requête
) {
  try {
    const userId = req.user._id; // Supposons que l'ID de l'utilisateur est stocké dans req.user
    return await this.service.getReponsesByEvaluationandUser(evaluationId, userId);
  } catch (error) {
    throw new NotFoundException(error.message);
  }
}


  @Get('/evaluation/:evaluationId')
  async getReponsesByEvaluation(@Param('evaluationId') evaluationId: string) {
    try {
      return await this.service.getReponsesByEvaluation(evaluationId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
