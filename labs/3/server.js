let http = require("http");
let Utils = require("./modules/utils.js");
let url = require("url");
let FileHandler = require('./modules/fileHandler.js')

const path = require('path');
const FILE_PATH = path.join(__dirname, 'file.txt');


class simpleServer{
    constructor (PORT){
        this.port = PORT;
        this.server = http.createServer((req, res) => {
            let parsedUrl = url.parse(req.url, true);
            let pathname = parsedUrl.pathname;
            let query = parsedUrl.query;
            let text = query.text;

            if (pathname.startsWith(BASE_PATH)) {
                pathname = pathname.slice(BASE_PATH.length);
            }

            if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);

            if (pathname === "/getDate") {
                let name = query.name;
                let dateMessage = Utils.getDate(name);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(`<span style="color:blue">${dateMessage}</span>`);
            } 
            else if(pathname === "/writeFile") {
                FileHandler.appendToFile(FILE_PATH, text);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(`<span style="color:blue">Text appended to file.txt</span>`);
            }
            else if (pathname === "/readFile/file.txt") {
                try {
                    let content = FileHandler.readFromFile(FILE_PATH);
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(`<span style="color:blue">${content}</span>`);
                } catch (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(`<span style="color:blue">404: file.txt not found</span>`);
            }}
            else{
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(`<span style="color:blue">Not Found</span>`);
        }}
    )}

    start(){
        this.server.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);});
        };
}   


 let PORT = process.env.PORT || 3000;
 const myServer = new simpleServer(PORT)
 myServer.start();
