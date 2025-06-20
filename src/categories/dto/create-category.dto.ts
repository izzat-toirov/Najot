import { Category } from '../model/category.model';

export class CreateCategoryDto implements Partial<Category> {
  name: string;
  description: string;
}
