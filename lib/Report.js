/*
@exportId UtYIumB9RnKF2MAs9HY-9Q
*/
module.exports = (function() {
class Report {
  constructor(props) {
    this.location = props.location;
    this.journal = props.journal;
    this.issues = props.issues;
    this.date = props.date;
    this.time = props.time;
    this.author = props.author;
  }

  static fromString(string) {
    return new Report(JSON.parse(string));
  }

  toString() {
    return JSON.stringify(this);
  }

  toArgs() {
    return [{
      name: "reportData",
      value: this.toString()
    }]
  }

  draftChoices() {
    const args = this.toArgs();
    return [{
      actionName: "collectIssue",
      args: args,
      label: "Add another issue"
    }, {
      actionName: "saveReport",
      args: args,
      label: "Submit report"
    }, {
      actionName: "newReport",
      label: "Start over"
    }];
  }

  toRow() {
    return [
      this.date,
      this.time,
      this.author,
      this.location,
      this.journal,
      this.issueList()
    ];
  }

  static fromRow(row) {
    return new Report({
      date: row[0],
      time: row[1],
      author: row[2],
      location: row[3],
      journal: row[4],
      issues: (row[5] || "").split("\n").map((ea) => ea.replace(/^- /, ""))
    });
  }

  issueList() {
    return this.issues.map((issue) => `- ${issue}`).join("\n");
  }

  format(options) {
    return `
${options && options.withTime ? `**Time:** ${this.time}\n` : ""
}**Reporter:** ${this.author}
**Location:** ${this.location}
**Journal:** ${this.journal}
**Issues:**
${this.issueList()}
    `;
  }

  draftResult() {
    return `Here is your report so far:

---

${this.format()}

---

`;
  }
}

Report.OTHER_FARM_ISSUE = "Other... (Explain)";
Report.DATE_FORMAT = "M/D/YYYY";
Report.TIME_FORMAT = "h:mm:ss a";

return Report;

})()
     