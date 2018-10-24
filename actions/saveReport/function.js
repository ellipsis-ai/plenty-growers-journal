function(reportData, ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const moment = require('moment-timezone');

const Report = require("Report");
const report = Report.fromString(reportData);
const now = moment.tz(ellipsis.teamInfo.timeZone);
report.timestamp = now.format("MMMM D YYYY h:mm:ss a");
const SAVE_ERROR_MESSAGE = `An error occurred while trying to save your report. Please notify <@${ellipsis.env.GROWERS_REPORT_MANAGER_USER_ID}>.`;

client.authorize().then(() => {
  return sheets.spreadsheets.values.append({
    spreadsheetId: ellipsis.env.GROWERS_REPORT_SHEET_ID,
    range: ellipsis.env.GROWERS_REPORT_SHEET_NAME,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [report.toRow()]
    },
    auth: client
  });
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: SAVE_ERROR_MESSAGE
  });
}).then(() => {
  ellipsis.success(report.format());
});
}
