import { Transaction } from './Transaction';
import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';
import { TransactionSpreadsheetRepository } from '../../infra/repository/transaction/TransactionSpreadsheetRepository';

export class TransactionService {
  constructor(
    private readonly transactionApi = new TransactionApi(),
    private readonly transactionSpreadsheetRepository = new TransactionSpreadsheetRepository(),
  ) {}

  listBetweenDates(accountId: string, from: Date, to: Date): Transaction[] {
    const sheetsTransactions = this.transactionSpreadsheetRepository.listTransactionsIdsFromSheet();

    return this.transactionApi
      .listBetweenDates(accountId, from, to)
      .filter((t) => !sheetsTransactions.includes(t.id))
      .flatMap((transaction) => {
        if (transaction.creditCardMetadata) {
          return this.split(
            transaction,
            transaction.creditCardMetadata.installmentNumber,
            transaction.creditCardMetadata.totalInstallments,
          );
        }
        return transaction;
      });
  }

  private split(t: Transaction, installmentNumber: number, totalInstallments: number) {
    const installments = [];

    for (let i = installmentNumber; i <= totalInstallments; i++) {
      const transactionDate = new Date(t.date.getTime());
      new Date(t.date.getTime()).setMonth(t.date.getMonth() + i - 1);

      installments.push(
        new Transaction(
          t.id + i,
          t.description + ` - ${i}/${totalInstallments}`,
          t.descriptionRaw,
          t.currencyCode,
          t.amount,
          t.amountInAccountCurrency,
          transactionDate,
          t.category,
          t.categoryId,
          t.balance,
          t.accountId,
          t.providerCode,
          t.status,
          t.type,
          null,
          t.createdAt,
          t.updatedAt,
        ),
      );
    }

    return installments;
  }
}
