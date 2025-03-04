import { Controller, Post, UseInterceptors, UploadedFile, Param, ParseUUIDPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';

@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("uploadImage/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id',ParseUUIDPipe) id: string, @UploadedFile(new ParseFilePipe({
        validators: [ 
          new MaxFileSizeValidator({
            maxSize:200000,
            message:"la imagen no debe superar los 200kb"
          }),
          new FileTypeValidator({
            fileType:/(jpg|jpeg|png|webp)$/i
          }),
        ],
      }),
    ) file: Express.Multer.File) {

    return this.cloudinaryService.uploadImage(file, id);
  }
}
