/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreditTransactionView } from './application/transaction/CreditTransactionView';
import { AccountView } from './application/account/AccountView';
import { CheckingAccountTransactionView } from './application/transaction/CheckingAccountTransactionView';
import { CategoryView } from './application/category/CategoryView';

function onOpen() {
  const accountSubmenu = SpreadsheetApp.getUi().createMenu('Contas');
  accountSubmenu.addItem('Baixar dados das contas', 'requestAccountsRefresh');
  accountSubmenu.addSeparator();
  accountSubmenu.addItem('Atualizar cartão de crédito', 'appendNewCreditTransactions');
  accountSubmenu.addItem('Atualizar conta corrente', 'appendNewCheckingAccountTransactions');
  accountSubmenu.addItem('Atualizar dashboard', 'updateAccountsBalance');

  const settingsSubMenu = SpreadsheetApp.getUi().createMenu('Configurações');
  settingsSubMenu.addItem('Atualizar categorias', 'updateCategories');

  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addSubMenu(accountSubmenu);
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
