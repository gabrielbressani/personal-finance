import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';
import { CreditTransactionSpreadsheetRepository } from '../../infra/repository/transaction/CreditTransactionSpreadsheetRepository';
import { TransactionService } from './TransactionService';
import { Transaction } from './Transaction';

export class CreditTransactionService extends TransactionService {
  constructor(transactionApi = new TransactionApi()) {
    super(transactionApi, new CreditTransactionSpreadsheetRepository());
  }

  getFilterPredicate(transaction: Transaction): boolean {
    return !transaction.description.includes('PAG BOLETO BANCARIO');
  }
}
