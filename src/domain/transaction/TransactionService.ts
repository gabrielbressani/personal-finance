import { Transaction } from './Transaction';
import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';

export class TransactionService {
  constructor(private readonly transactionApi = new TransactionApi()) {}

  listBetweenDates(accountId: string, from: Date, to: Date): Transaction[] {
    return this.transactionApi.listBetweenDates(accountId, from, to).flatMap((transaction) => {
      if (transaction.creditCardMetadata) {
        return this.split(transaction, transaction.creditCardMetadata.totalInstallments);
      }
      return transaction;
    });
  }

  private split(t: Transaction, totalInstallments: number) {
    const installments = [];

    for (let i = 1; i <= totalInstallments; i++) {
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
