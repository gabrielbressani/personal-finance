import { SheetRepository } from '../spreadsheet/SheetRepository';
import { SheetsName } from '../spreadsheet/SheetsName';
import { UtilService } from '../../../UtilService';

export class TransactionSpreadsheetRepository extends SheetRepository {
  constructor() {
    const sheetName =
      UtilService.getSheet().getName() === SheetsName.CREDIT_CARD
        ? SheetsName.CREDIT_CARD
        : SheetsName.CHECKING_ACCOUNT;
    super(sheetName);
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
