/* eslint-disable @typescript-eslint/no-unused-vars */
import { TransactionView } from './application/transaction/TransactionView';
import { AccountView } from './application/AccountView';

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Pedir atualização das contas', 'requestAccountsRefresh');
  menu.addItem('Atualizar saldo das contas', 'updateAccountsBalance');
  menu.addItem('Baixar transações', 'appendNewTransactions');
  menu.addToUi();
}
function requestAccountsRefresh() {
  new AccountView().requestAccountsRefresh();
}

function updateAccountsBalance() {
  new AccountView().updateAccountsBalance();
}

function appendNewTransactions() {
  new TransactionView().appendNewTransactions();
}
