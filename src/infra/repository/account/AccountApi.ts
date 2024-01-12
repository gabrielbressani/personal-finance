import { PluggyApi } from '../PluggyApi';
import { Account } from '../../../domain/account/Account';

export class AccountApi {
  constructor(private readonly pluggyApi = new PluggyApi()) {}

  updateItem(itemId: string, token: string | undefined): void {
    if (token) {
      const payload = {
        parameters: {
          token: token,
        },
      };
      this.pluggyApi.doRequest('patch', `/items/${itemId}`, {
        contentType: 'application/json',
        payload: JSON.stringify(payload),
      });
    }

    this.pluggyApi.doRequest('patch', `/items/${itemId}`);
  }

  getByItemId(itemId: string) {
    const response = this.pluggyApi.doRequest('get', `/accounts?itemId=${itemId}&type=BANK`);

    return response.results.map(
      (a: never) =>
        new Account(a['id'], a['type'], a['subtype'], a['name'], a['balance'], a['currencyCode']),
    );
  }
}
