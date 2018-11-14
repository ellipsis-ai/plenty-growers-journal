function(channel, recurrence, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const actions = new EllipsisApi(ellipsis).actions;
const moment = require('moment-timezone');
actions.unschedule({
  actionName: "reportsForToday",
  channel: channel,
}).then(() => actions.schedule({
  actionName: "reportsForToday",
  channel: channel,
  recurrence: recurrence
})).then((resp) => {
  const next = moment.tz(resp.scheduled.firstRecurrence, ellipsis.teamInfo.timeZone).format("LLLL");
  ellipsis.success(`OK, I scheduled the reports to happen ${resp.scheduled.recurrence} in ${channel}. The next time will be ${next}.`);
});
}
