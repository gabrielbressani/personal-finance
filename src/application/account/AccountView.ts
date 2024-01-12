import { UtilService } from '../../UtilService';
import { AccountApi } from '../../infra/repository/account/AccountApi';
import { Account } from '../../domain/account/Account';
import { AccountSpreadsheetRepository } from '../../infra/repository/account/AccountSpreadsheetRepository';

export class AccountView {
  constructor(
    private readonly items = new Map([
      ['Bradesco', '8c11c231-3476-4fb4-bae9-b73f47e2fd39'],
      ['NubankGabriel', 'fa818bb4-31ea-427c-9b4e-1210c2bf49e1'],
      ['NubankCeci', 'e0f8ea76-3a99-4dc0-b7dc-b6c2ceb0098c'],
      ['ItauGabriel', '4130e304-fba6-4b8c-8131-e34b045664b6'],
      ['ItauCeci', '46924458-fa34-434d-958b-3f8761b35abf'],
    ]),
    private readonly accountApi = new AccountApi(),
    private readonly accountSpreadsheetRepository = new AccountSpreadsheetRepository(),
  ) {}

  requestAccountsRefresh(): void {
    for (const [bankName, itemId] of this.items) {
      if (bankName === 'Bradesco') {
        const brasdescoToken = UtilService.requestUserData('Insira chave do Bradesco');
        this.accountApi.updateItem(itemId, brasdescoToken);
      }
      this.accountApi.updateItem(itemId, undefined);
    }

    SpreadsheetApp.getUi().alert(
      'Atualização solicitada. Levará 5 minutos até os dados estarem disponíveis.',
    );
  }

  updateAccountsBalance() {
    const sheetData: (string | Date | number)[][] = [];

    for (const [bankName, itemId] of this.items) {
      const accounts = this.accountApi.getByItemId(itemId);

      const accountsBalance = accounts.reduce((acc: number, account: Account) => {
        return acc + account.balance;
      }, 0);

      sheetData.push([bankName, accountsBalance]);
    }

    this.accountSpreadsheetRepository.updateAccountsBalance(sheetData);
  }
}
