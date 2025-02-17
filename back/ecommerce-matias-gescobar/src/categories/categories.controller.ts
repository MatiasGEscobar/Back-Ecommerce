import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';



@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  AddCategories() {
    return this.categoriesService.AddCategories();
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
