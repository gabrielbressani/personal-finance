import { UtilService } from '../../UtilService';
import { AccountService } from '../../domain/account/AccountService';

export class AccountView {
  constructor(private readonly accountService = new AccountService()) {}

  requestAccountsRefresh(): void {
    const brasdescoToken = UtilService.requestUserData('Insira chave do Bradesco');
    const message = 'Atualização solicitada. Levará 5 minutos até os dados estarem disponíveis.';
    this.accountService.requestAccountsRefresh(brasdescoToken);
    SpreadsheetApp.getUi().alert(message);
  }

  updateAccountsBalance() {
    this.accountService.updateAccountsBalance();
  }
}
