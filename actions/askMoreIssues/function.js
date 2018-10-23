function(reportData, moreIssues, ellipsis) {
  const Report = require("Report");
const report = Report.fromString(reportData);

ellipsis.success("", {
  next: {
    actionName: moreIssues ? "collectIssue" : "saveReport",
    args: report.toArgs()
  }
});
}
