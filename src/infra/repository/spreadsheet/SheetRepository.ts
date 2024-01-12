import { UtilService } from '../../../UtilService';
import { SheetsName } from './SheetsName';
import { SheetData } from './SheetData';

export abstract class SheetRepository {
  constructor(protected readonly sheetName: SheetsName) {}

  isActive(): boolean {
    return UtilService.getSheet().getName() === this.sheetName;
  }

  update(sheetData: SheetData, sortColumn: number | null = null): void {
    const sheet = this.getSheet();

    if (sheetData.length)
      sheet.getRange(2, 1, sheetData.length, sheetData[0].length).setValues(sheetData);

    if (sortColumn) this.sortSheet(sortColumn, true);
  }

  add(sheetData: SheetData, sortColumn: number | null = null): void {
    const sheet = this.getSheet();

    if (sheetData.length)
      sheet
        .getRange(sheet.getLastRow() + 1, 1, sheetData.length, sheetData[0].length)
        .setValues(sheetData);

    if (sortColumn) this.sortSheet(sortColumn, true);
  }

  protected getSheet(): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(this.sheetName);
    if (!sheet) throw new Error(`${this.sheetName} not found`);
    return sheet;
  }

  private sortSheet(column: number, ascending: boolean): void {
    const sheet = this.getSheet();
    const range = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
    range.sort({ column: column, ascending: ascending });
  }
}
