import { UtilService } from '../../../UtilService';

export class AccountSpreadsheetRepository {
  updateAccountsBalance(sheetData: (string | Date | number)[][]): void {
    const sheet = UtilService.getSheet('CONTAS');

    const lastRow = sheet.getLastRow();

    if (sheetData.length)
      sheet.getRange(lastRow + 1, 1, sheetData.length, sheetData[0].length).setValues(sheetData);
  }
}
