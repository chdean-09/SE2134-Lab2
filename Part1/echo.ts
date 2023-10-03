import http, { IncomingMessage, ServerResponse } from 'node:http';

function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);
  response
    // 200 tells the browser the response is successful, memorize the common ones: 200, 401, 403, 404, 500
    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    .writeHead(200)
    .end('Why did you send me ' + url + '?');
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});