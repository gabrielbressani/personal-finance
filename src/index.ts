import { TransactionView } from './application/transaction/TransactionView';
import { AccountView } from './application/AccountView';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Saldo', 'appendNewAvailableTransactions');
  menu.addItem('Transações', 'appendNewAvailableTransactions');
  menu.addItem('Pedir atualização de contas', 'refreshAccounts');
  menu.addToUi();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function appendNewAvailableTransactions() {
  new TransactionView().appendNewTransactions();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function refreshAccounts() {
  new AccountView().requestAccountsRefresh();
}
