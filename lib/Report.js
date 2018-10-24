/*
@exportId UtYIumB9RnKF2MAs9HY-9Q
*/
module.exports = (function() {
class Report {
  constructor(props) {
    this.location = props.location;
    this.journal = props.journal;
    this.issues = props.issues;
    this.timestamp = props.timestamp;
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
      this.timestamp,
      this.author,
      this.location,
      this.journal,
      this.issueList()
    ];
  }
  
  issueList() {
    return this.issues.map((issue) => `- ${issue}`).join("\n");
  }

  format() {
    return `
**Reporter:** ${this.author}
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

return Report;

})()
     