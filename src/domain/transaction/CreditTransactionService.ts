import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';
import { CreditTransactionSpreadsheetRepository } from '../../infra/repository/transaction/CreditTransactionSpreadsheetRepository';
import { TransactionService } from './TransactionService';
import { Transaction } from './Transaction';
import { CategoryApi } from '../../infra/repository/category/CategoryApi';

export class CreditTransactionService extends TransactionService {
  constructor(transactionApi = new TransactionApi(), categoryApi = new CategoryApi()) {
    super(transactionApi, categoryApi, new CreditTransactionSpreadsheetRepository());
  }

  getFilterPredicate(transaction: Transaction): boolean {
    return !transaction.description.includes('PAG BOLETO BANCARIO');
  }
}
