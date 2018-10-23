function(reportData, otherIssueText, moreIssues, ellipsis) {
  const Report = require("Report");
const report = Report.fromString(reportData);
report.issues = report.issues.concat(`Other: ${otherIssueText}`);

ellipsis.success("", {
  next: {
    actionName: moreIssues ? "collectIssue" : "saveReport",
    args: report.toArgs()
  }
});
}
