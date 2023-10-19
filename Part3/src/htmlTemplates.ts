import Loan from "./loanInterface";

export function successfulInsert(values: (string | number)[]) {
  const name = values[0];
  const email = values[1];
  const phone = values[2];
  const loanAmountNum = Number(values[3]);
  const reason = values[4];
  const token = values[6];
  const date = values[7];

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
    <br>
    Loan Details:<br>
    Unique Token: ${token}<br>
    Email: ${email}<br>
    Phone Number: ${phone}<br>
    Loan Amount: ₱${loanAmountNum.toFixed(2)}<br>
    Reason for loan: ${reason}<br>
    Time and Date Applied: ${date}<br>
    <button onclick="location.href = '/apply-loan';">
      Go back
    </button>
  </body>
  </html>
`};

export function checkInfo(loan: Loan) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${loan.name}'s Details</title>
  </head>
  
  <body>
    Unique Token: ${loan.token}<br>
    Name: ${loan.name}<br>
    Email: ${loan.email}<br>
    Phone Number: ${loan.phone}<br>
    Loan Amount: ₱${Number(loan.loan_amount).toFixed(2)}<br>
    Reason for loan: ${loan.reason}<br>
    Status: ${loan.status} ${status(loan.status)}<br>
    Time and Date Applied: ${loan.creation_date}<br>
    <br>
    Repayment Amount (+20%): ₱${Number(loan.loan_amount * 1.2).toFixed(2)}<br>
    <button onclick="location.href = '/apply-loan';">
      Go back
    </button>
  </body>
  </html>
`};

function status(statusInfo: string) {
  if (statusInfo === 'APPLIED') {
    return '(Please wait for your loan to be processed)';
  } else if (statusInfo === 'APPROVED') {
    return '(Your loan request is approved by THE LOAN MASTER)';
  } else if (statusInfo === 'REJECTED') {
    return '(Your loan request is rejected, better luck next time)';
  } else if (statusInfo === 'CASH_RELEASED') {
    return '(Your cash has been released! Check your bank account)';
  } else {
    return '(Your loan has been repaid! Thank you for using this loaning service)';
  }
};

export function allInfos(allLoans: Loan[]) {
  let number = 1;
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

  allLoans.forEach((loan) => {html +=`
    ${number}.
    Name: ${loan.name}<br>
    Unique Token: ${loan.token}<br>
    Email: ${loan.email}<br>
    Phone Number: ${loan.phone}<br>
    Loan Amount: ₱${Number(loan.loan_amount).toFixed(2)}<br>
    Repayment Amount (+20%): ₱${Number(loan.loan_amount * 1.2).toFixed(2)}<br>
    Reason for loan: ${loan.reason}<br>
    Time and Date Applied: ${loan.creation_date}<br>
    Status: ${loan.status}<br>
    <br>
  `
  number++;
  });

  html += `
  <button onclick="location.href = '/apply-loan';">
    Go back
  </button>
  </body>
  </html>
  `;

  return html;
};