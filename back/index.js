import http from "http";
const server = http.createServer((req , res) =>{
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end("Mon serveur eb fonctionne");
});

server.listen(5000, () => {
    console.log("serveur demarré sur http://localhost:5000")
});