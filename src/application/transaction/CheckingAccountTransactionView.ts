import { CheckingAccountTransactionService } from '../../domain/transaction/CheckingAccountTransactionService';

export class CheckingAccountTransactionView {
  constructor(private readonly transactionService = new CheckingAccountTransactionService()) {}

  public appendNewTransactions() {
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    this.transactionService.addBetweenDates(
      'e052f80c-155f-4457-af31-50356cba9ef8',
      aHundredDaysBefore,
      today,
    );
  }
}
