# WebSockets Example

This project demonstrates a simple WebSocket server using Node.js and TypeScript. It includes two approaches:
- A raw HTTP server with WebSocket integration ([src/index.ts](src/index.ts))
- An Express-based server with WebSocket integration ([src/expressWebSocket.ts](src/expressWebSocket.ts))

## Features

- Broadcasts messages from one client to all connected clients.
- Logs client connections and messages.
- Handles WebSocket errors gracefully.
### Running the Server

To start the raw HTTP WebSocket server:

```sh
node dist/index.js
```

Or, to use the Express-based server:

```sh
node dist/expressWebSocket.js
```

The server will listen on port `8080`.
