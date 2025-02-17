import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../utils/seeders/Archivo actividad 3.json'

@Injectable()
export class CategoriesRepository {
    constructor (
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    async getCategories(){
        return await this.categoriesRepository.find()
    }

    async addCategories(){
        for(const element of data){
            const categoryExist = await this.categoriesRepository.findOne({
                where: { name: element.category},
        })

        if(!categoryExist){
            const newCategory = this.categoriesRepository.create({
                name: element.category,
            })
            await this.categoriesRepository.save(newCategory)
        }
        }

        return 'Categorias agregadas'
    }
}