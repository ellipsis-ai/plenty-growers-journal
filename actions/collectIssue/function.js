function(reportData, issue, ellipsis) {
  const Report = require("Report");
const report = Report.fromString(reportData);
const isOtherIssue = issue.label === Report.OTHER_FARM_ISSUE;
if (isOtherIssue) {
  ellipsis.success("", {
    next: {
      actionName: "reportOtherIssue",
      args: report.toArgs()
    }
  });
} else {
  report.issues = report.issues.concat(issue.label);
  ellipsis.success(report.draftResult(), {
    choices: report.draftChoices()
  });
}
}
