import { ScriptCache } from '../cache/ScriptCache';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doRequest(method: string, apiUrl: string, options: any = {}) {
    try {
      const apiKey = this.getPluggyApiKey();

      const defaultOptions = {
        method: method,
        headers: {
          'X-API-KEY': apiKey,
        },
      };

      const response = UrlFetchApp.fetch(`${this.baseUrl}${apiUrl}`, {
        ...defaultOptions,
        ...options,
      });

      return JSON.parse(response.getContentText());
    } catch (e) {
      Logger.log('Pluggy api error ' + e);
    }
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
