import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';
import { TransactionService } from './TransactionService';
import { CheckingAccountTransactionsRepository } from '../../infra/repository/transaction/CheckingAccountTransactionsRepository';
import { Transaction } from './Transaction';

export class CheckingAccountTransactionService extends TransactionService {
  constructor(transactionApi = new TransactionApi()) {
    super(transactionApi, new CheckingAccountTransactionsRepository());
  }
  getFilterPredicate(transaction: Transaction): boolean {
    return !(
      transaction.description.includes('Transfer Saldo Poupanca') ||
      transaction.description.includes('Transf Entre Contas') ||
      transaction.description.includes('Aplic.invest Facil') ||
      transaction.description.includes('Aplicacao Cdb') ||
      transaction.description.includes('Resgate Invest Facil') ||
      transaction.description.includes('Resg Automatico Investim') ||
      transaction.description.includes('Resg/vencto Cdb')
    );
  }
}
