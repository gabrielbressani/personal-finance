import { PluggyApi } from '../infra/repository/PluggyApi';
import { Transaction } from './Transaction';
import { CreditCardSpreadsheetRepository } from '../infra/repository/CreditCardSpreadsheetRepository';

export class TransactionService {
  constructor(
    private readonly pluggyApi = new PluggyApi(),
    private readonly creditCardSpreadsheetRepository = new CreditCardSpreadsheetRepository(),
  ) {}

  listUniquesBetweenDates(accountId: string, from: Date, to: Date): Transaction[] {
    const alreadyListedTransactionsId = this.creditCardSpreadsheetRepository.listTransactionsIds();
    const transactions = this.pluggyApi.listCreditCardTransactions(accountId, from, to);

    return transactions
      .filter((t) => !alreadyListedTransactionsId.includes(t.id))
      .flatMap((t) => {
        if (t.creditCardMetadata) {
          const installments = [];
          for (
            let i = t.creditCardMetadata.installmentNumber;
            i <= t.creditCardMetadata.totalInstallments;
            i++
          ) {
            const newDate = new Date(t.date.getTime()); // Create a new date based on the input date
            newDate.setMonth(t.date.getMonth() + i - 1);

            const installment = new Transaction(
              t.id + i,
              t.description + ` - ${i}/${t.creditCardMetadata.totalInstallments}`,
              t.descriptionRaw,
              t.currencyCode,
              t.amount,
              t.amountInAccountCurrency,
              newDate,
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
            );
            installments.push(installment);
          }
          return installments;
        }

        return t;
      });
  }
}
