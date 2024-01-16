/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreditTransactionView } from './application/transaction/CreditTransactionView';
import { AccountView } from './application/account/AccountView';
import { CheckingAccountTransactionView } from './application/transaction/CheckingAccountTransactionView';
import { CategoryView } from './application/category/CategoryView';

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();

  const accountSubmenu = SpreadsheetApp.getUi().createMenu('Contas');
  accountSubmenu.addItem('Baixar dados das contas', 'requestAccountsRefresh');
  accountSubmenu.addSeparator();
  accountSubmenu.addItem('Atualizar todas as abas', 'refreshAllTabs');
  accountSubmenu.addSeparator();
  accountSubmenu.addItem('Atualizar cartão de crédito', 'appendNewCreditTransactions');
  accountSubmenu.addItem('Atualizar conta corrente', 'appendNewCheckingAccountTransactions');
  accountSubmenu.addItem('Atualizar dashboard', 'updateAccountsBalance');
  menu.addSubMenu(accountSubmenu);

  menu.addSeparator();
  menu.addItem('Checar reembolsos', 'checkRefunds');
  menu.addSeparator();

  const settingsSubMenu = SpreadsheetApp.getUi().createMenu('Configurações');
  settingsSubMenu.addItem('Peparar planilha para o primeiro uso', 'prepareSpreadsheet');
  settingsSubMenu.addItem('Cadastrar novas contas', 'addNewAccounts');
  settingsSubMenu.addItem('Atualizar categorias', 'updateCategories');
  menu.addSubMenu(settingsSubMenu);

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
