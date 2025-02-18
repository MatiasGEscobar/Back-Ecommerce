import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';


@Injectable()
export class CloudinaryService {
 constructor (private readonly cloudinaryRepository : CloudinaryRepository){}

 uploadImage(id: string, file: Express.Multer.File){
  return this.cloudinaryRepository.uploadImage(id, file)
 }
}
