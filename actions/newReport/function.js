function(location, journal, ellipsis) {
  const Report = require("Report");

const report = new Report({
  location: location.label,
  journal: journal,
  issues: [],
  author: ellipsis.userInfo.fullName
});

ellipsis.success("", {
  next: {
    actionName: "collectIssue",
    args: report.toArgs()
  }
});
}
