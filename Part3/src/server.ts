import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import * as crypto from "node:crypto"
import pool from './database';
import { allInfos, checkInfo, successfulInsert } from './htmlTemplates';

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/apply-loan') {
    const contents = await fs.readFile("./Part3/index.html", "utf-8");

    response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(contents.toString());
  } else if (url?.startsWith('/apply-loan-success')) {
    const myUrl = new URL(url, 'http://localhost');
    
    const name = myUrl.searchParams.get('name')!;
    const email = myUrl.searchParams.get('email')!;
    const phone = myUrl.searchParams.get('phone')!;
    const loanAmount = myUrl.searchParams.get('loan_amount')!;
    const reason = myUrl.searchParams.get('reason')!;

    const loanAmountNum = parseInt(loanAmount!);
    const status = 'APPLIED';
    const token = crypto.randomBytes(32).toString('base64url');
    const date = new Date(Date.now());

    const query = `
      INSERT INTO loans
      (name, email, phone, loan_amount, reason, status, token)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [name, email, phone, loanAmountNum, reason, status, token];

    try {
      await pool.query(query, values);

      response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(successfulInsert(values));
    } catch(error) {
      response
      .writeHead(200, { 'Content-Type': 'text/plain' })
      .end('Having trouble applying loan. Error: ' + error);
    }
  } else if (url?.startsWith('/check-loan')) {
    const myUrl = new URL(url, 'http://localhost');

    const tokenInput = myUrl.searchParams.get('uniqueToken')!;

    const query = `
      SELECT * FROM loans
      WHERE token = $1
    `;

    const value = [tokenInput]

    try {
      const result = await pool.query(query, value);
      const loanInfo = result.rows[0];
      
      response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(checkInfo(loanInfo));
    } catch (error) {
      response
      .writeHead(200, { 'Content-Type': 'text/plain' })
      .end('Invalid Token. Try again or apply for a new loan.');
    }
  } else if (url === '/admin-mode') {
    const query = `
      SELECT * FROM loans
      ORDER BY id ASC
    `;

    try {
      const result = await pool.query(query);
      const allLoans = result.rows;

      response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(allInfos(allLoans));
    } catch(error) {
      response
      .writeHead(200, { 'Content-Type': 'text/plain' })
      .end('Having trouble applying loan. Error: ' + error);
    }
  } else {
    response
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end('The (unexpected) url is: ' + url + '. Maybe try double checking the url? <a href="/apply-loan">This should be the correct link.</a>');
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});