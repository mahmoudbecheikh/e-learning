import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  @Post()
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }



  @Get()
  findOne(@Query('idUser') user: string,
    @Query('idFormation') formation: string) {
    return this.progressService.find(user, formation);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.addCours(id, updateProgressDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.progressService.remove(+id);
  // }
}
