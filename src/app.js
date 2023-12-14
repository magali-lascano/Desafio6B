import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import cookieParser from 'cookie-parser';

import viewRouter from "./routes/view.router.js";
import productsRouter from './routes/products.js';
import cartsRouter from './routes/cart.js';
import cookieRouter from './routes/cookies.routes.js';
import { __dirname} from './utils.js';
import ProductManager from "./dao/controllers/product.controller.mdb.js";
import MessagesManager from "./dao/controllers/message.controller.mdb.js";
import UserMongo from './dao/controllers/user.controller.mdb.js';
import "./dao/dbconf.js";

const app = express();
const PORT = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());


// handlebars
app.engine('handlebars', handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/cookies', cookieRouter);

// socket server
const pmanagersocket = new ProductManager();
const messagesManager = new MessagesManager();
const userMongo = new UserMongo (); 
const httpServer = app.listen(PORT,() => {console.log("Listening on PORT: 8080");});
const socketServer = new Server(httpServer);
socketServer.on("Coneccion", (socket) => {
    console.log(`Cliente connectado: ${socket.id}`);
    socket.on(`Desconectar`, () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
    socket.on("newproduct", (newProduct) => {
        console.log(`Producto agregado: ${newProduct}`);
        ProductManager.addProduct({...newProduct });
    });
    socket.on("deleteProduct", (productId) => {
        console.log(`Producto borrado ${productId}`);
        ProductManager.deleteProductById(productId);
    });
    socket.on("message", async (info) => {
        console.log(info)
        await messagesManager.createMessage(info);
        socketServer.emit("chat", await messagesManager.getMessages());
    });
});
