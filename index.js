const http = require("http");

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end('Hello World!');
});

server.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})

//node --env-file=.env  index.js