import { UtilService } from '../../UtilService';

export class CreditCardSpreadsheetRepository {
  listTransactionsIds(): string[] {
    const sheet = UtilService.getSheetByName('CreditCard');
    const lastRow = sheet.getLastRow();
    return sheet
      .getRange(2, 1, lastRow, 1)
      .getValues()
      .flatMap((t) => t);
  }

  appendTransactions(transactions: (string | number)[][]): void {
    const sheet = UtilService.getSheetByName('CreditCard');
    const lastRow = sheet.getLastRow();

    if (transactions.length)
      sheet
        .getRange(lastRow + 1, 1, transactions.length, transactions[0].length)
        .setValues(transactions);

    UtilService.sortSheet(2, true);
  }
}
