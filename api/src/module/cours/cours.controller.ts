import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Delete,
  Patch,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { CoursService } from './cours.service';
import { CreateCourDto } from './dto/create-cours.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { UpdateCourDto } from './dto/update-cours.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Cours } from './entities/cours.entity';
// import { UpdateCourDto } from './dto/update-cours.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as path from 'path';

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCourDto: CreateCourDto,
  ) {
    let videoUploaded = {};
    const filesUploaded = [];
    let fileUploaded = {};
    for (let i = 0; i < files.length; i++) {
      fileUploaded = {
        originalname: files[i].originalname,
        filename: files[i].filename,
        path: files[i].path,
        mimetype: files[i].mimetype,
        size: files[i].size,
      };
      if (!files[i].mimetype.includes('video')) {
        filesUploaded.push(fileUploaded);
      } else {
        videoUploaded = files[i];
      }
    }

    console.log(filesUploaded);

    const coursData = {
      nom: createCourDto.nom,
      video: videoUploaded,
      files: filesUploaded,
      description: createCourDto.description,
      dateCreation: new Date().toISOString(),
    };

    console.log(coursData);

    return this.coursService.create(coursData);
  }

  @Get()
  async findAll(): Promise<Cours[]> {
    return this.coursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateCourDto: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(files);

    let videoUploaded = {};
    const filesUploaded = [];
    let fileUploaded = {};
    for (let i = 0; i < files.length; i++) {
      fileUploaded = {
        originalname: files[i].originalname,
        filename: files[i].filename,
        path: files[i].path,
        mimetype: files[i].mimetype,
        size: files[i].size,
      };
      if (!files[i].mimetype.includes('video')) {
        filesUploaded.push(fileUploaded);
      } else {
        videoUploaded = files[i];
      }
    }

    console.log(filesUploaded);

    const coursData = {
      nom: updateCourDto.nom,
      video: videoUploaded,
      files: filesUploaded,
      description: updateCourDto.description,
      dateCreation: new Date().toISOString(),
    };

    console.log(coursData);

    return this.coursService.update(id, coursData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursService.remove(id);
  }

  @Post('/download')
  download(@Body() file: any, @Res() res) {
    const filepath =
      path.join(__dirname, '../../../uploads') + '/' + file.filename;
    res.sendFile(filepath);
  }
}
