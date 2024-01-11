import { ScriptCache } from '../cache/ScriptCache';
import { CreditCardMetadata, Transaction } from '../../domain/Transaction';

export class PluggyApi {
  private readonly clientId: string;
  private readonly clientSecret: string;
  constructor(
    private readonly scriptCache = new ScriptCache(),
    private readonly baseUrl = 'https://api.pluggy.ai',
  ) {
    const scriptProperties = PropertiesService.getScriptProperties().getProperties();
    this.clientId = scriptProperties['clientId'];
    this.clientSecret = scriptProperties['clientSecret'];
  }

  listCreditCardTransactions(accountId: string, from: Date, to: Date): Transaction[] {
    const apiKey = this.getPluggyApiKey();

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

  getPluggyApiKey() {
    const apiKey = this.scriptCache.retrieveFromCache('apiKey');
    const apiKeyCreationDate = new Date(this.scriptCache.retrieveFromCache('apiKeyCreationDate'));

    const isApiKeyAlreadyCreatedToday =
      apiKeyCreationDate &&
      apiKeyCreationDate.getDate() === new Date().getDate() &&
      apiKeyCreationDate.getMonth() === new Date().getMonth() &&
      apiKeyCreationDate.getFullYear() === new Date().getFullYear();

    if (apiKey && isApiKeyAlreadyCreatedToday) {
      Logger.log('Returning cached api key ' + apiKeyCreationDate);
      return apiKey;
    }

    const response = UrlFetchApp.fetch(`${this.baseUrl}/auth`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ clientId: this.clientId, clientSecret: this.clientSecret }),
    });

    const responseData = JSON.parse(response.getContentText());
    const newApiKey = responseData['apiKey'];
    const newApiKeyCreationDate = new Date();

    this.scriptCache.storeInCache('apiKey', newApiKey);
    this.scriptCache.storeInCache('apiKeyCreationDate', newApiKeyCreationDate.toString());

    Logger.log('Returning a new api key ' + newApiKeyCreationDate);
    return newApiKey;
  }
}
