import { CreditCardMetadata, Transaction } from '../../../domain/transaction/Transaction';
import { PluggyApi } from '../PluggyApi';

export class TransactionApi {
  constructor(private readonly pluggyApi = new PluggyApi()) {}

  listBetweenDates(accountId: string, from: Date, to: Date): Transaction[] {
    const response = this.pluggyApi.doRequest(
      'GET',
      `/transactions?accountId=${accountId}&from=${Utilities.formatDate(
        from,
        'GMT-3',
        'yyyy-MM-dd',
      )}&to=${Utilities.formatDate(to, 'GMT-3', 'yyyy-MM-dd')}&page=${1}&pageSize=${500}`,
    );

    return response.results.map((t: never) => {
      const metaData = t['creditCardMetadata'];
      return new Transaction(
        t['id'],
        t['description'],
        t['descriptionRaw'],
        t['currencyCode'],
        t['amount'],
        t['amountInAccountCurrency'],
        new Date(t['date']),
        t['category'],
        t['categoryId'],
        t['balance'],
        t['accountId'],
        t['providerCode'],
        t['status'],
        t['type'],
        metaData
          ? new CreditCardMetadata(
              metaData['installmentNumber'],
              metaData['totalInstallments'],
              metaData['totalAmount'],
            )
          : null,
        new Date(t['createdAt']),
        new Date(t['updatedAt']),
      );
    });
  }
}
