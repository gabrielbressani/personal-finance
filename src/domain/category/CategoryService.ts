import { CategoryApi } from '../../infra/repository/category/CategoryApi';
import { SheetData } from '../../infra/repository/spreadsheet/SheetData';
import { CategorySpreadsheetRepository } from '../../infra/repository/category/CategorySpreadsheetRepository';

export class CategoryService {
  constructor(
    private readonly categoryApi = new CategoryApi(),
    private readonly categorySpreadsheetRepository = new CategorySpreadsheetRepository(),
  ) {}
  list() {
    const categories = this.categoryApi.list();

    const sheetData: SheetData = categories.map((category) => [
      category.description,
      category.descriptionTranslated,
      category.parentDescription,
    ]);

    this.categorySpreadsheetRepository.update(sheetData, 3);
  }
}
