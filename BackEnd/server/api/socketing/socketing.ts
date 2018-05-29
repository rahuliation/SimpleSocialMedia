
export var connections = []
export var IO: SocketIO.Server;

export default function (io: SocketIO.Server) {
    IO=io; 
    io.on('connection', function (socket) {

        socket.on('getProfile', function (data) {
            connections.push({socketID: socket.id , data: data}) ;
            io.local.emit('online', data);
        });
        socket.on('disconnect', function () {
            connections = connections.filter(connection => connection.socketID!= socket.id);
        });
    });

}