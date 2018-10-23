function(reportData, issue, ellipsis) {
  const Report = require("Report");
const report = Report.fromString(reportData);
const isOtherIssue = issue.label === Report.OTHER_FARM_ISSUE;
let result = "";
if (!isOtherIssue) {
  report.issues = report.issues.concat(issue.label);
  result = `Here is your report so far:

${report.format()}
`;
}
ellipsis.success(result, {
  next: {
    actionName: isOtherIssue ? "reportOtherIssue" : "askMoreIssues",
    args: report.toArgs()
  }
});
}
