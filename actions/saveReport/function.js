function(reportData, ellipsis) {
  const client = require('google-client')(ellipsis);
const {google} = ellipsis.require('googleapis@38.0.0');
const sheets = google.sheets({
  version: 'v4',
  auth: client
});
const moment = require('moment-timezone');

const Report = require("Report");
const report = Report.fromString(reportData);
const now = moment.tz(ellipsis.teamInfo.timeZone);
report.date = now.format(Report.DATE_FORMAT);
report.time = now.format(Report.TIME_FORMAT);
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
