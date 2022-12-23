const express = require('express');
const app = express();
const productosRouter = require('./routes/productos');
const { Server: HTTPserver } = require("http");
const { Server: IOServer } = require("socket.io");
const PORT = 8080;

app.use('/productos', productosRouter)
const httpServer = new HTTPserver(app);
const socketServer = new IOServer(httpServer)
app.use(express.static('public'));

app.set('view engine', 'ejs')
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html")
})

socketServer.on('connection', async (socket) => {
    console.log('conectado al servidor');

    const resultado = await productos.getAll()
    socket.emit('showItems', resultado);

    socket.on('nuevoItem', async (newItem) => {
        await productos.save(newItem);

        socketServer.sockets.emit('itemNuevo', newItem);
    })
})

socketServer.on('connection', async (socket) => {
    const resultado = await mensajes.getAll()
    
    socket.emit('MENSAJES_EXISTENTES', resultado );
    socket.on('chat_message', (msg) => {
        
        msj = { ...msg, id: socket.id, date: new Date }
        mensajes.saveMsj(msj) 
        console.log("mensaje:", msj)
        socketServer.sockets.emit('new_message', msj)

    })

})

httpServer.listen(PORT, () => {
    console.log(`Servidor  escuchando en el puerto ${PORT}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))