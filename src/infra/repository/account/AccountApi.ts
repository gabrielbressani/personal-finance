import { PluggyApi } from '../PluggyApi';

export class AccountApi {
  constructor(private readonly pluggyApi = new PluggyApi()) {}

  updateItem(itemId: string, token: string | undefined): void {
    if (token) {
      const payload = {
        parameters: {
          token: token,
        },
      };
      this.pluggyApi.doRequest('patch', '/items/' + itemId, {
        contentType: 'application/json',
        payload: JSON.stringify(payload),
      });
    }

    this.pluggyApi.doRequest('patch', '/items/' + itemId);
  }
}
