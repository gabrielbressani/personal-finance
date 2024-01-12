import { CreditTransactionService } from '../../domain/transaction/CreditTransactionService';

export class CreditTransactionView {
  constructor(private readonly transactionService = new CreditTransactionService()) {}

  public appendNewTransactions() {
    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    this.transactionService.addBetweenDates(
      '654dcc6c-831a-4964-aec7-841227204c2f',
      aHundredDaysBefore,
      today,
    );
  }
}
