import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class UtilService {
  static getDayFormat(date = new Date()): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  static getSheetByName(name: string): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(name);
    if (!sheet) throw new Error(`${name} not found`);
    return sheet;
  }

  static sortSheet(column: number, ascending: boolean): void {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
    range.sort({ column: column, ascending: ascending });
  }
}
