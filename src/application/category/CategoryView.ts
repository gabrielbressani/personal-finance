import { CategoryService } from '../../domain/category/CategoryService';

export class CategoryView {
  constructor(private readonly categoryService = new CategoryService()) {}

  list() {
    this.categoryService.list();
  }
}
