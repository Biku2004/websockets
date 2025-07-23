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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http")); // creating a inbuilt http server and it is different from express server
const server = http_1.default.createServer(function (request, response) {
    console.log((new Date()) + 'Received request for ' + request.url);
    response.end("hi there");
});
const wss = new ws_1.WebSocketServer({ server });
// here instead to passing server we can also pass {noserver:true}
// we are trying to say that noserver true beucase we may have to create multiple websockets
// ans on calling one api we connect to one server another api type to another
let userCount = 0; // showing number of clients connected
wss.on('connection', function connection(ws) {
    ws.on('error', console.error); // error handling
    // getting message from the client
    ws.on('message', function message(data, isBinary) {
        // there can be multiple clients on the server and on each client client if the websocket is on ready state or not
        // we are cheking it OPEN or not because many time websockets fail or disconnected in the middle.
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                // client is sending the data to the server
                client.send(data, { binary: isBinary });
                // thid "binary" is important because if missing when client sends data to the server if not present it will show as object and send to the other clients
            }
        });
    });
    console.log("User connected ", ++userCount);
    ws.send('Hello! Message from Server!!');
});
server.listen(8080, function () {
    console.log((new Date()) + 'Server is listening on port 8080');
});
