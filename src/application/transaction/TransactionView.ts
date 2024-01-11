import { TransactionController } from './TransactionController';
import { TransactionSpreadsheetRepository } from '../../infra/repository/transaction/TransactionSpreadsheetRepository';

export class TransactionView {
  constructor(
    private readonly transactionController = new TransactionController(),
    private readonly transactionSpreadsheetRepository = new TransactionSpreadsheetRepository(),
  ) {}

  public appendNewTransactions() {
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    const transactionsResponse = this.transactionController.listBetweenDates(
      '654dcc6c-831a-4964-aec7-841227204c2f',
      aHundredDaysBefore,
      today,
    );

    const alreadyListedTransactions =
      this.transactionSpreadsheetRepository.listTransactionsIdsFromSheet();

    const uniqueTransactions = transactionsResponse.filter(
      (t) => !alreadyListedTransactions.includes(t[0]['id']),
    );

    // Logger.log(uniqueTransactions);
    this.transactionSpreadsheetRepository.appendTransactions(uniqueTransactions);
  }
}
