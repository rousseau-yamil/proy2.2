import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';

import cookieParser from "cookie-parser"
import session from 'express-session'
import connectMongo from 'connect-mongo'
import { config } from './configuracion/config.js';
import jwt from 'jsonwebtoken' 


//Routers
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import sessionRouter from './routes/sessionsRouter.js'

import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';

//Passport
import { iniciarPassport } from './configuracion/passport.config.js';
import passport from 'passport';
import { iniciarJWTPassport } from './configuracion/passport.config_jwt.js';



//DAO 
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from '../src/controller/cartController.js';






const app = express();
const PORT = 8080;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// conexion 0.1
//const uri = 'mongodb://127.0.0.1:27017/entrega-final';
//mongoose.connect(uri);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//datos locales

import data from './data/productos.json' assert { type: 'json' }

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname,'src','public')));
//app.use(express.static(path.join(__dirname,'/public')));


//Conexion 1.0
// app.use(session({
    //   secret: 'mi_clave_super_secreta',       // cámbiala por una segura en producción
    //   resave: false,
    //   saveUninitialized: false,
    //   cookie: { secure: false }         // Usa true solo si estás usando HTTPS
    // }));
    
    //conexion 2.0
    app.use(session({
        //secret: config.SECRET_SESSION,
        secret:config.SESSION_SECRET,
        resave:true, 
        saveUninitialized:true,
        cookie: {
            secure: false,      // true solo si usas HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 // 1 hora
        },         // Usa true solo si estás usando HTTPS
        store: connectMongo.create({
            //mongoUrl:config.MONGO_URL,
            mongoUrl:config.MONGO_URL,
            //dbName:config.DB_NAME,
            dbName:config.DB_NAME,
            ttl:3600 
        })
        
    }))
    console.log('MONGO_URL:', config.MONGO_URL);
    //mongodb://${this.MONGO_HOST}:${this.MONGO_PORT}/${this.DB_NAME}`
    
    const conectar=async()=>{
        try {
            await mongoose.connect(config.MONGO_URL, {dbName:config.DB_NAME})
            console.log(`Conexión a DB establecida`)
        } catch (err) {
            console.log(`Error al conectarse con el servidor de BD: ${err}`)
        }
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    const httpServer = app.listen(PORT, () => {
        console.log(`Start server in PORT ${PORT}`);
    });
   
// iniciarPassport()
// app.use(passport.initialize())
//JWT
iniciarJWTPassport()
app.use(passport.initialize())
//app.use(passport.session())

const io = new Server(httpServer);
    //Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/api/sessions',sessionRouter)
//app.use('/current',sessionRouter) corregido
    
//DAO CARRITO


websocket(io);
conectar()