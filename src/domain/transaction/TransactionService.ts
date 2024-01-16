import { Transaction } from './Transaction';
import { TransactionApi } from '../../infra/repository/transaction/TransactionApi';
import { CreditTransactionSpreadsheetRepository } from '../../infra/repository/transaction/CreditTransactionSpreadsheetRepository';
import { SheetData } from '../../infra/repository/spreadsheet/SheetData';

export abstract class TransactionService {
  constructor(
    private readonly transactionApi: TransactionApi,
    private readonly transactionSpreadsheetRepository: CreditTransactionSpreadsheetRepository,
  ) {}

  addBetweenDates(accountId: string, from: Date, to: Date): void {
    const sheetsTransactions = this.transactionSpreadsheetRepository.listTransactionsIdsFromSheet();

    const transactions = this.transactionApi
      .listBetweenDates(accountId, from, to)
      .filter((t) => this.getFilterPredicate(t))
      .flatMap((transaction) => {
        if (transaction.creditCardMetadata) {
          return this.split(
            transaction,
            transaction.creditCardMetadata.installmentNumber,
            transaction.creditCardMetadata.totalInstallments,
          );
        }
        return transaction;
      })
      .filter((t) => !sheetsTransactions.includes(t.id));

    const sheetData: SheetData = transactions.map((transaction) => [
      transaction.id,
      transaction.date,
      transaction.description,
      transaction.category,
      transaction.type,
      transaction.amount,
    ]);

    this.transactionSpreadsheetRepository.add(sheetData, 2);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFilterPredicate(transaction: Transaction): boolean {
    return true;
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
