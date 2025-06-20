import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly CategoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.CategoryModel.create(createCategoryDto);
    } catch (error) {
      console.error(error);
      return 'Category yaratilmadi';
    }
  }

  async findAll() {
    try {
      return await this.CategoryModel.findAll();
    } catch (error) {
      console.error(error);
      return 'Categorylar topilmadi';
    }
  }

  async findOne(id: number) {
    try {
      return await this.CategoryModel.findByPk(id);
    } catch (error) {
      console.error(error);
      return 'category topilmadi';
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.CategoryModel.findByPk(id);
      if (!category) return `category topilmadi`;
      return await category.update(updateCategoryDto);
    } catch (error) {
      console.error(error);
      return 'category topilmadi';
    }
  }

  async remove(id: number) {
    try {
      const category = await this.CategoryModel.findByPk(id);
      if (!category) return `category topilmadi`;
      await category.destroy();
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.error(error);
      return 'category topilmadi';
    }
  }
}
