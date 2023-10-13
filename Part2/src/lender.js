"use strict";
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
function handleRequest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = request.url;
        const method = request.method;
        console.log('Debugging -- url is', url, 'while method is', method);
        if (url === '/apply-loan') {
            try {
                const contents = yield promises_1.default.readFile('./Part2/money-lender.html', 'utf-8');
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(contents.toString());
            }
            catch (error) {
                console.log('Error: ', error);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
            }
        }
        else {
            response
                .writeHead(200)
                .end('You sent me:' + url);
        }
    });
}
const server = node_http_1.default.createServer(handleRequest);
server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
