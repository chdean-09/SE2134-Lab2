"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const promises_1 = __importDefault(require("node:fs/promises"));
const crypto = __importStar(require("node:crypto"));
const database_1 = __importDefault(require("./database"));
const htmlTemplates_1 = require("./htmlTemplates");
function handleRequest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = request.url;
        const method = request.method;
        console.log('Debugging -- url is', url, 'while method is', method);
        if (url === '/apply-loan') {
            const contents = yield promises_1.default.readFile("./Part3/index.html", "utf-8");
            response
                .writeHead(200, { 'Content-Type': 'text/html' })
                .end(contents.toString());
        }
        else if (url === null || url === void 0 ? void 0 : url.startsWith('/apply-loan-success')) {
            const myUrl = new URL(url, 'http://localhost');
            const name = myUrl.searchParams.get('name');
            const email = myUrl.searchParams.get('email');
            const phone = myUrl.searchParams.get('phone');
            const loanAmount = myUrl.searchParams.get('loan_amount');
            const reason = myUrl.searchParams.get('reason');
            const loanAmountNum = parseInt(loanAmount);
            const status = 'APPLIED';
            const token = crypto.randomBytes(32).toString('base64url');
            const date = new Date();
            const query = `
      INSERT INTO loans
      (name, email, phone, loan_amount, reason, status, token, creation_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    `;
            const values = [name, email, phone, loanAmountNum, reason, status, token];
            try {
                yield database_1.default.query(query, values);
                values.push(date.toString());
                response
                    .writeHead(200, { 'Content-Type': 'text/html' })
                    .end((0, htmlTemplates_1.successfulInsert)(values));
            }
            catch (error) {
                response
                    .writeHead(200, { 'Content-Type': 'text/plain' })
                    .end('Having trouble applying loan. Error: ' + error);
            }
        }
        else if (url === null || url === void 0 ? void 0 : url.startsWith('/check-loan')) {
            const myUrl = new URL(url, 'http://localhost');
            const tokenInput = myUrl.searchParams.get('uniqueToken');
            const query = `
      SELECT * FROM loans
      WHERE token = $1
    `;
            const value = [tokenInput];
            try {
                const result = yield database_1.default.query(query, value);
                const loanInfo = result.rows[0];
                response
                    .writeHead(200, { 'Content-Type': 'text/html' })
                    .end((0, htmlTemplates_1.checkInfo)(loanInfo));
            }
            catch (error) {
                response
                    .writeHead(200, { 'Content-Type': 'text/plain' })
                    .end('Invalid Token. Try again or apply for a new loan. Stop snooping around o_o');
            }
        }
        else if (url === '/admin-mode') {
            const query = `
      SELECT * FROM loans
      ORDER BY id ASC
    `;
            try {
                const result = yield database_1.default.query(query);
                const allLoans = result.rows;
                response
                    .writeHead(200, { 'Content-Type': 'text/html' })
                    .end((0, htmlTemplates_1.allInfos)(allLoans));
            }
            catch (error) {
                response
                    .writeHead(200, { 'Content-Type': 'text/plain' })
                    .end('Having trouble applying loan. Error: ' + error);
            }
        }
        else {
            response
                .writeHead(200, { 'Content-Type': 'text/html' })
                .end('The (unexpected) url is: ' + url + '. Maybe try double checking the url? <a href="/apply-loan">This should be the correct link.</a>');
        }
    });
}
const server = node_http_1.default.createServer(handleRequest);
server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
