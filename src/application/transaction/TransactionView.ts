import { TransactionSpreadsheetRepository } from '../../infra/repository/transaction/TransactionSpreadsheetRepository';
import { SheetsName } from '../../infra/repository/spreadsheet/SheetsName';
import { TransactionService } from '../../domain/transaction/TransactionService';
import { SheetData } from '../../infra/repository/spreadsheet/SheetData';
import { UtilService } from '../../UtilService';

export class TransactionView {
  constructor(
    private readonly transactionService = new TransactionService(),
    private readonly transactionSpreadsheetRepository = new TransactionSpreadsheetRepository(),
  ) {}

  public appendNewTransactions() {
    const accountId =
      UtilService.getSheet().getName() === SheetsName.CREDIT_CARD
        ? '654dcc6c-831a-4964-aec7-841227204c2f'
        : 'e052f80c-155f-4457-af31-50356cba9ef8';
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);

    const transactions: SheetData = this.transactionService
      .listBetweenDates(accountId, aHundredDaysBefore, today)
      .map((transaction) => [
        transaction.id,
        transaction.date,
        transaction.description,
        transaction.category,
        transaction.type,
        transaction.amount,
      ]);

    this.transactionSpreadsheetRepository.add(transactions);
  }
}
