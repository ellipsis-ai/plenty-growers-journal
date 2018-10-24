function(reportData, otherIssueText, ellipsis) {
  const Report = require("Report");
const report = Report.fromString(reportData);
report.issues = report.issues.concat(`Other: ${otherIssueText}`);

ellipsis.success(report.draftResult(), {
  choices: report.draftChoices()
});
}
