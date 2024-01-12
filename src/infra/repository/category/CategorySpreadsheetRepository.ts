import { SheetRepository } from '../spreadsheet/SheetRepository';
import { SheetsName } from '../spreadsheet/SheetsName';

export class CategorySpreadsheetRepository extends SheetRepository {
  constructor() {
    super(SheetsName.CATEGORY);
  }
}
