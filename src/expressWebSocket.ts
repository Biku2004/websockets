// simple web socket using nodejs express
import express from "express";
import { WebSocket, WebSocketServer} from 'ws';

const app = express();

app.get("/", (req,res) =>{
    res.send("Hello world");
})

let httpServer = app.listen(8080);

const wss = new WebSocketServer({server: httpServer});

wss.on('connection', function connection(ws){
    // whenever there is a connection control reach here before the start of the ws
    // meaning that it will have the access to teh "ws" variable

    ws.on('message', function message(data){
        // I received a message from the client and just logging it
        console.log("received %s",data);
    });

});


