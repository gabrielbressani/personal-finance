import { UtilService } from '../../../UtilService';
import { TransactionResponse } from '../../../application/transaction/TransactionResponse';

export class TransactionSpreadsheetRepository {
  listTransactionsIdsFromSheet(sheetName: string = 'CreditCard'): string[] {
    const sheet = UtilService.getSheetByName(sheetName);
    const lastRow = sheet.getLastRow();
    return sheet
      .getRange(2, 1, lastRow, 1)
      .getValues()
      .flatMap((t) => t);
  }

  appendTransactions(transactions: TransactionResponse[][]): void {
    const sheet = UtilService.getSheetByName('CreditCard');
    const lastRow = sheet.getLastRow();

    const sheetData: (string | Date | number)[][] = transactions.map((t) => [
      t[0].id,
      t[0].date,
      t[0].description,
      t[0].category,
      t[0].type,
      t[0].amount,
    ]);

    if (transactions.length)
      sheet.getRange(lastRow + 1, 1, sheetData.length, sheetData[0].length).setValues(sheetData);

    UtilService.sortSheet(2, true);
  }
}
