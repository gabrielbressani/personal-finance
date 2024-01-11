import { CreditCardView } from './application/CreditCardView';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Credit card', 'appendNewAvailableTransactions');
  menu.addToUi();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function appendNewAvailableTransactions() {
  new CreditCardView().appendNewAvailableTransactions();
}
