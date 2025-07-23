import WebSocket , {WebSocketServer} from "ws";
import http from 'http'; // creating a inbuilt http server and it is different from express server

const server = http.createServer( function(request:any, response:any){
    console.log((new Date()) + 'Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({server}); 
// here instead to passing server we can also pass {noserver:true}
// we are trying to say that noserver true beucase we may have to create multiple websockets
// ans on calling one api we connect to one server another api type to another

let userCount = 0; // showing number of clients connected
wss.on('connection', function connection(ws) {
    ws.on('error',console.error); // error handling

    // getting message from the client
    ws.on('message', function message(data, isBinary){
        
        // there can be multiple clients on the server and on each client client if the websocket is on ready state or not
        // we are cheking it OPEN or not because many time websockets fail or disconnected in the middle.
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                // client is sending the data to the server and server is sending it back to other clients
                client.send(data,{ binary: isBinary});
                // thid "binary" is important because if missing when client sends data to the server if not present it will show as object and send to the other clients
            }
        });
    })
    console.log("User connected ",++userCount); 
    ws.send('Hello! Message from Server!!');
});

server.listen(8080,function(){
    console.log( (new Date()) + 'Server is listening on port 8080');
});