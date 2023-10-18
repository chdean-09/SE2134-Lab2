"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allInfos = exports.checkInfo = exports.successfulInsert = void 0;
function successfulInsert(values) {
    let name = values[0];
    let email = values[1];
    let phone = values[2];
    let loanAmountNum = values[3];
    let reason = values[4];
    let status = values[5];
    let token = values[6];
    return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}'s Details</title>
  </head>
  
  <body>
    Hello, ${name}! Your loan has been successfully applied! <br>
    Make sure to save your unique token as it lets you check your loan status anytime. <br>
    Loan Details:<br>
    Unique Token: ${token}<br>
    Email: ${email}<br>
    Phone Number: ${phone}<br>
    Loan Amount: ${loanAmountNum}<br>
    Reason for loan: ${reason}<br>
    Status: ${status}<br>
    <button onclick="location.href = '/apply-loan';">
      Go back
    </button>
  </body>
  </html>
`;
}
exports.successfulInsert = successfulInsert;
;
function checkInfo(loanInfo) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${loanInfo.name}'s Details</title>
  </head>
  
  <body>
    Name: ${loanInfo.name}<br>
    Unique Token: ${loanInfo.token}<br>
    Email: ${loanInfo.email}<br>
    Phone Number: ${loanInfo.phone}<br>
    Loan Amount: ${loanInfo.loan_amount}<br>
    Reason for loan: ${loanInfo.reason}<br>
    Status: ${loanInfo.status} ${status(loanInfo.status)}<br>
    <button onclick="location.href = '/apply-loan';">
      Go back
    </button>
  </body>
  </html>
`;
}
exports.checkInfo = checkInfo;
;
function status(statusInfo) {
    if (statusInfo === 'APPLIED') {
        return 'Please wait for your loan to be processed.';
    }
    else if (statusInfo === 'APPROVED') {
        return 'Your loan request is approved by THE LOAN MASTER HIMSELF.';
    }
    else if (statusInfo === 'REJECTED') {
        return 'Your loan request is rejected by the overlords.';
    }
    else if (statusInfo === 'CASH_RELEASED') {
        return "Your cash has been released! Check your bank account (It's not zero anymore)";
    }
    else {
        return "Your loan has been repaid! Thank you for using this loaning service.";
    }
}
;
function allInfos(allLoans) {
    let html = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loaner Details</title>
  </head>
  
  <body>
  `;
    allLoans.forEach((item) => {
        html += `
    Name: ${item.name}<br>
    Unique Token: ${item.token}<br>
    Email: ${item.email}<br>
    Phone Number: ${item.phone}<br>
    Loan Amount: ${item.loan_amount}<br>
    Reason for loan: ${item.reason}<br>
    Status: ${item.status}<br>
    <br>
  `;
    });
    html += `
  <button onclick="location.href = '/apply-loan';">
    Go back
  </button>
  </body>
  </html>
  `;
    return html;
}
exports.allInfos = allInfos;
;
