import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class UtilService {
  static getDayFormat(date = new Date()): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  static requestUserData(message: string) {
    const prompt = SpreadsheetApp.getUi().prompt(
      message,
      SpreadsheetApp.getUi().ButtonSet.OK_CANCEL,
    );
    if (prompt.getSelectedButton() !== SpreadsheetApp.getUi().Button.OK) {
      return '';
    }
    return prompt.getResponseText().trim();
  }

  static getSheet(name: string | null = null): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    let sheet;
    if (name) {
      sheet = spreadsheet.getSheetByName(name);
    } else {
      sheet = spreadsheet.getActiveSheet();
    }

    if (!sheet) throw new Error(`${name} not found`);
    return sheet;
  }
}
