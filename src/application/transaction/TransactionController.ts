import { TransactionService } from '../../domain/transaction/TransactionService';
import { TransactionResponse } from './TransactionResponse';

export class TransactionController {
  constructor(private readonly transactionService = new TransactionService()) {}
  listBetweenDates(accountId: string, from: Date, to: Date) {
    return this.transactionService
      .listBetweenDates(accountId, from, to)
      .map((transaction) => [
        new TransactionResponse(
          transaction.id,
          transaction.date,
          transaction.description,
          transaction.category,
          transaction.type,
          transaction.amount,
        ),
      ]);
  }
}
