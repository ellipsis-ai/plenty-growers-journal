function(ellipsis) {
  const greeting = require('ellipsis-random-response').greetingForTimeZone(ellipsis.teamInfo.timeZone);
const client = require('google-client')(ellipsis);
const {google} = ellipsis.require('googleapis@36.0.0');
const sheets = google.sheets('v4');
const moment = require('moment-timezone');
const Report = require("Report");
moment.tz.setDefault(ellipsis.teamInfo.timeZone);
const now = moment();

client.authorize().then(() => {
  return sheets.spreadsheets.values.get({
    spreadsheetId: ellipsis.env.GROWERS_REPORT_SHEET_ID,
    range: ellipsis.env.GROWERS_REPORT_SHEET_NAME,
    valueRenderOption: 'FORMATTED_VALUE',
    auth: client
  });
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: "Couldn’t load growers journal reports from the spreadsheet."
  });
}).then((response) => {
  const rows = response.data.values;
  if (!rows) {
    ellipsis.error("No data returned from the spreadsheet", {
      userMessage: "No data was found in the spreadsheet."
    });
  } else {
    const inRange = rows.map(Report.fromRow).filter((report) => {
      try {
        const dateTime = moment(`${report.date} ${report.time}`, `${Report.DATE_FORMAT} ${Report.TIME_FORMAT}`, true);
        return dateTime.isValid() && dateTime.isSame(now, 'day');
      } catch(err) {
        return false;
      }
    });
    const reports = inRange.map((ea) => ea.format({ withTime: true })).join("\n\n---\n\n");
    let result;
    if (inRange.length > 1) {
      result = `There are ${inRange.length} grower’s journal reports today:

---

${reports}`;
    } else if (inRange.length === 1) {
      result = `Here is today’s grower’s journal report:

---

${reports}`;
    } else if (ellipsis.event.originalEventType !== "scheduled") {
      result = "There are no grower’s journal reports so far today.";
    }
    
    if (result) {
      ellipsis.success(`${greeting}

  ${result}`);
    } else {
      ellipsis.noResponse();
    }
  }
});
}
