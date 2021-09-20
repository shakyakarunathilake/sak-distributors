const http = require("http");
const app = require("./app");

const port = process.env.PORT || 8080;

// const server = http.createServer(app);

// server.listen(port);

http.createServer(app)
    .listen(port, () => {
        console.log(`Your Server is running on port ${port} .`);
    });
