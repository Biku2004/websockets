"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// simple web socket using nodejs express
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello world");
});
let httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    // whenever there is a connection control reach here before the start of the ws
    // meaning that it will have the access to teh "ws" variable
    ws.on('message', function message(data) {
        // I received a message from the client and just logging it
        console.log("received %s", data);
    });
});
