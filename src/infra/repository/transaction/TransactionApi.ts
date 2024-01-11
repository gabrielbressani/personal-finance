import { CreditCardMetadata, Transaction } from '../../../domain/transaction/Transaction';
import { PluggyApi } from '../PluggyApi';

export class TransactionApi {
  constructor(
    private readonly pluggyApi = new PluggyApi(),
    private readonly baseUrl = 'https://api.pluggy.ai',
  ) {}

  listBetweenDates(accountId: string, from: Date, to: Date): Transaction[] {
    const apiKey = this.pluggyApi.getPluggyApiKey();

    const url = `${this.baseUrl}/transactions?accountId=${accountId}&from=${Utilities.formatDate(
      from,
      'GMT-3',
      'yyyy-MM-dd',
    )}&to=${Utilities.formatDate(to, 'GMT-3', 'yyyy-MM-dd')}&page=${1}&pageSize=${500}`;

    const response = UrlFetchApp.fetch(url, { headers: { 'X-API-KEY': apiKey } });

    return JSON.parse(response.getContentText()).results.map((t: never) => {
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
