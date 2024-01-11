import { TransactionService } from '../domain/TransactionService';
import { PluggyApi } from '../infra/repository/PluggyApi';
import { TransactionResponse } from './TransactionResponse';

export class TransactionController {
  constructor(private readonly transactionService = new TransactionService(new PluggyApi())) {}
  getNewAvailableTransactions(accountId: string, from: Date, to: Date) {
    return this.transactionService
      .listUniquesBetweenDates(accountId, from, to)
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
