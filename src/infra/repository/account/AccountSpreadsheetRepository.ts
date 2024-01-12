import { SheetRepository } from '../spreadsheet/SheetRepository';
import { SheetsName } from '../spreadsheet/SheetsName';

export class AccountSpreadsheetRepository extends SheetRepository {
  constructor() {
    super(SheetsName.DASHBOARD);
  }
}
