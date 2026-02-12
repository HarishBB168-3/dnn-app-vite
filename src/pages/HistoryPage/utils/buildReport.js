export const buildReport = ({ caseReportList, holdCount, lastLine }) => {
  const doneItems = caseReportList
    .filter(
      (item) =>
        item.Hold_Cancel_type === "Done" && item.mtrType && item.workType
    )
    .map((item) => `${item.NOTIFICATION_NO} ${item.mtrType} ${item.workType}`);

  const cancelItems = caseReportList
    .filter(
      (item) =>
        item.Hold_Cancel_type === "CANCEL" && item.mtrType && item.workType
    )
    .map((item) => item.NOTIFICATION_NO);

  const reportParts = [];

  if (doneItems.length) {
    reportParts.push(...doneItems, "");
  }

  if (cancelItems.length) {
    reportParts.push("Cancel", ...cancelItems, "");
  }

  if (holdCount > 0) {
    reportParts.push(`${holdCount} Hold`, "");
  }

  if (lastLine?.trim()) {
    reportParts.push(lastLine.trim());
  }

  return reportParts.join("\n");
};
