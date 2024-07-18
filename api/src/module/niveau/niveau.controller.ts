import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NiveauService } from './niveau.service';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';

@Controller('niveau')
export class NiveauController {
  constructor(private readonly niveauService: NiveauService) {}

  @Post()
  async create(@Body() createNiveauDto: CreateNiveauDto) {
    return this.niveauService.create(createNiveauDto);
  }

  @Get()
  async findAll() {
    return this.niveauService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.niveauService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNiveauDto: UpdateNiveauDto,
  ) {
    return this.niveauService.update(id, updateNiveauDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.niveauService.remove(id);
  }
}
