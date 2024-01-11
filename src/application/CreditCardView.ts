import { TransactionController } from './TransactionController';
import { CreditCardSpreadsheetRepository } from '../infra/repository/CreditCardSpreadsheetRepository';

export class CreditCardView {
  constructor(
    private readonly transactionController = new TransactionController(),
    private readonly creditCardSpreadsheetRepository = new CreditCardSpreadsheetRepository(),
  ) {}

  public appendNewAvailableTransactions() {
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    const sheetData = this.transactionController.getNewAvailableTransactions(
      '654dcc6c-831a-4964-aec7-841227204c2f',
      today,
      aHundredDaysBefore,
    );

    this.creditCardSpreadsheetRepository.appendTransactions(sheetData);
  }
}
