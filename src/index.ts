/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreditTransactionView } from './application/transaction/CreditTransactionView';
import { AccountView } from './application/account/AccountView';
import { CheckingAccountTransactionView } from './application/transaction/CheckingAccountTransactionView';

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  // menu.addItem('Cadastrar novas contas', 'addNewAccounts');
  menu.addItem('Pedir atualização manual de contas', 'requestAccountsRefresh');
  menu.addSeparator();
  menu.addItem('Atualizar transações de crédito', 'appendNewCreditTransactions');
  menu.addItem('Atualizar transações de conta corrente', 'appendNewCheckingAccountTransactions');
  menu.addItem('Atualizar dashboard', 'updateAccountsBalance');
  menu.addToUi();
}

function addNewAccounts() {
  SpreadsheetApp.getUi().alert('Não implementado');
}
function requestAccountsRefresh() {
  new AccountView().requestAccountsRefresh();
}

function appendNewCreditTransactions() {
  new CreditTransactionView().appendNewTransactions();
}

function appendNewCheckingAccountTransactions() {
  new CheckingAccountTransactionView().appendNewTransactions();
}

function updateAccountsBalance() {
  new AccountView().updateAccountsBalance();
}
