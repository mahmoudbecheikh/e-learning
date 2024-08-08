import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { CreateNiveauDto } from 'src/module/niveau/dto/create-niveau.dto';
import { Niveau } from 'src/module/niveau/schemas/niveau.schema';
@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  async create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationService.create(createFormationDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(id, updateFormationDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.formationService.destroy(id);
  }
  @Get()
  async getAll() {
    return this.formationService.getAll();
  }
  @Get(':id')
  async GetById(@Param('id') id: string) {
    return this.formationService.getById(id);
  }
  @Patch(':id/niveaux')
  async addLevel(
    @Param('id') id: string,
    @Body() createNiveauDto: CreateNiveauDto,
  ) {
    const niveau = new Niveau(createNiveauDto);
    return this.formationService.addLevel(id, niveau);
  }
}
