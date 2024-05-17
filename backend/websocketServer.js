import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8081 });

const clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const { type, username } = JSON.parse(message);
        if (type === 'register') {
            clients.set(username, ws);
        }
    });

    ws.on('close', () => {
        for (let [username, client] of clients.entries()) {
            if (client === ws) {
                clients.delete(username);
                break;
            }
        }
    });
});

function broadcast(data) {
    const { username, ...message } = data;
    if (clients.has(username)) {
        const client = clients.get(username);
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    }
}

export { broadcast };
