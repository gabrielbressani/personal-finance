import { TransactionController } from './transaction/TransactionController';
import { CreditCardSpreadsheetRepository } from '../infra/repository/CreditCardSpreadsheetRepository';

export class CreditCardView {
  constructor(
    private readonly transactionController = new TransactionController(),
    private readonly creditCardSpreadsheetRepository = new CreditCardSpreadsheetRepository(),
  ) {}

  public appendNewAvailableTransactions() {
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    const transactionsResponse = this.transactionController.listBetweenDates(
      '654dcc6c-831a-4964-aec7-841227204c2f',
      aHundredDaysBefore,
      today,
    );

    const alreadyListedTransactions = this.creditCardSpreadsheetRepository.listTransactionsIds();

    const uniqueTransactions = transactionsResponse.filter(
      (t) => !alreadyListedTransactions.includes(t[0]['id']),
    );

    // Logger.log(uniqueTransactions);
    this.creditCardSpreadsheetRepository.appendTransactions(uniqueTransactions);
  }
}
