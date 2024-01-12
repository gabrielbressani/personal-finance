import { SheetRepository } from '../spreadsheet/SheetRepository';
import { SheetsName } from '../spreadsheet/SheetsName';

export class CheckingAccountTransactionsRepository extends SheetRepository {
  constructor() {
    super(SheetsName.CHECKING_ACCOUNT);
  }

  listTransactionsIdsFromSheet(): string[] {
    const sheet = this.getSheet();
    const lastRow = sheet.getLastRow();
    return sheet
      .getRange(2, 1, lastRow, 1)
      .getValues()
      .flatMap((t) => t);
  }
}
