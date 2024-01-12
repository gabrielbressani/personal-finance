import { TransactionController } from './TransactionController';
import { TransactionSpreadsheetRepository } from '../../infra/repository/transaction/TransactionSpreadsheetRepository';
import { SheetService } from '../spreadsheet/SheetService';
import { SheetsName } from '../spreadsheet/SheetsName';

export class TransactionView {
  private readonly BRADESCO_CREDIT_CARD_ACCOUNT_ID: string = '654dcc6c-831a-4964-aec7-841227204c2f';
  private readonly BRADESCO_CHECKING_ACCOUNT_ACCOUNT_ID: string =
    'e052f80c-155f-4457-af31-50356cba9ef8';

  constructor(
    private readonly sheetService = new SheetService(),
    private readonly transactionController = new TransactionController(),
    private readonly transactionSpreadsheetRepository = new TransactionSpreadsheetRepository(),
  ) {}

  public appendNewTransactions() {
    const accountId = this.sheetService.isActive(SheetsName.CREDIT_CARD)
      ? this.BRADESCO_CREDIT_CARD_ACCOUNT_ID
      : this.BRADESCO_CHECKING_ACCOUNT_ACCOUNT_ID;

    const today = new Date();
    const aHundredDaysBefore = new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000);
    const transactionsResponse = this.transactionController.listBetweenDates(
      accountId,
      aHundredDaysBefore,
      today,
    );

    this.transactionSpreadsheetRepository.appendTransactions(transactionsResponse);
  }
}
