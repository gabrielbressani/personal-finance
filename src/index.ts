/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreditTransactionView } from './application/transaction/CreditTransactionView';
import { AccountView } from './application/account/AccountView';
import { CheckingAccountTransactionView } from './application/transaction/CheckingAccountTransactionView';
import { CategoryView } from './application/category/CategoryView';

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Peparar planilha para o primeiro uso', 'prepareSpreadsheet');
  menu.addSeparator();
  menu.addItem('Cadastrar novas contas', 'addNewAccounts');
  menu.addItem('Pedir atualização manual de contas', 'requestAccountsRefresh');
  menu.addSeparator();
  menu.addItem('Checar reembolsos', 'checkRefunds');
  menu.addSeparator();
  menu.addItem('Atualizar dashboard', 'updateAccountsBalance');
  menu.addSeparator();
  menu.addItem('Atualizar todas as abas', 'refreshAllTabs');
  menu.addSeparator();
  menu.addItem('Atualizar transações de crédito', 'appendNewCreditTransactions');
  menu.addItem('Atualizar transações de conta corrente', 'appendNewCheckingAccountTransactions');
  menu.addSeparator();
  menu.addItem('Atualizar categorias', 'updateCategories');
  menu.addToUi();
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

function updateCategories() {
  new CategoryView().list();
}

function prepareSpreadsheet() {
  SpreadsheetApp.getUi().alert('Não implementado');
}

function checkRefunds() {
  SpreadsheetApp.getUi().alert('Não implementado');
}

function addNewAccounts() {
  SpreadsheetApp.getUi().alert('Não implementado');
}
function refreshAllTabs() {
  SpreadsheetApp.getUi().alert('Não implementado');
}
