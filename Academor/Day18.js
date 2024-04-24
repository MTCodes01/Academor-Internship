var protocol = require("http");
protocol
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!\n");
  })
  .listen(1234);
