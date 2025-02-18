import { Controller, Post, UseInterceptors, UploadedFile, Param, ParseUUIDPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("uploadImage/:id")
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id',ParseUUIDPipe) id: string, @UploadedFile(new ParseFilePipe({
        validators: [ new MaxFileSizeValidator({
            maxSize:200000,
            message:"la imagen no debe superar los 200kb"
          }),
          new FileTypeValidator({
            fileType:/(jpg|jpeg|png|webp)$/i
          }),
        ],
      }),
    ) file: Express.Multer.File) {

    return this.cloudinaryService.uploadImage(id, file);
  }
}
