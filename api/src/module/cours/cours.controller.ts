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
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Cours } from './entities/cours.entity';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';


@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const dir = file.mimetype.includes('video') ? './temp/uploads' : './uploads';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          callback(null, dir);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCourDto: CreateCourDto,
  ) {
    let videoUploaded = null;
    const filesUploaded = [];

    for (const file of files) {
      if (file.mimetype.includes('video')) {
        try {
          videoUploaded = await this.convertToMPEGDash(file);
        } catch (error) {
          console.error('Error processing video file:', error);
        }
      } else {
        filesUploaded.push({
          originalname: file.originalname,
          filename: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }

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

  private async convertToMPEGDash(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const outputDir = `uploads/dash/${fileName}`;
    const dashManifest = `${outputDir}/${fileName}.mpd`;

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Return a promise for ffmpeg conversion
    await new Promise<void>((resolve, reject) => {
        ffmpeg(file.path)
            .outputOptions([
                '-map 0',
                '-c:v libx264',
                '-b:v 1000k',
                '-s 1280x720',
                '-c:a aac',
                '-strict -2',
                '-f dash',
            ])
            .output(dashManifest)
            .on('end', () => {
                console.log('MPEG-DASH conversion finished.');
                try {
                    fs.unlinkSync(file.path); // Clean up temporary video file
                } catch (unlinkErr) {
                    console.error('Error deleting the temporary video file:', unlinkErr);
                }
                resolve();
            })
            .on('error', (err) => {
                console.error('Error during MPEG-DASH conversion:', err);
                reject(err);
            })
            .run();
    });

    return {
        originalname: file.originalname,
        filename: `${fileName}.mpd`,
        path: dashManifest,
        mimetype: 'application/dash+xml',
        size: file.size,
    };
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
        destination: (req, file, callback) => {
          const dir = file.mimetype.includes('video') ? './temp/uploads' : './uploads';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          callback(null, dir);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCourDto: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let videoUploaded = null;
    const filesUploaded = [];

    for (const file of files) {
      if (file.mimetype.includes('video')) {
        try {
          videoUploaded = await this.convertToMPEGDash(file);
        } catch (error) {
          console.error('Error processing video file:', error);
          // Optionally handle the error or notify the user
        }
      } else {
        filesUploaded.push({
          originalname: file.originalname,
          filename: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }

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
