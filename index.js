import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import{Mongo} from "./src/database/mongo.js";
import {config} from "dotenv";
import authRouter from './src/auth/auth.js'; 
import usersRouter from './src/routes/users.js';
import platesRouter from './src/routes/plates.js';
import ordersRouter from './src/routes/orders.js';

config();

async function main() {
    const hostname = "localhost";
    const port =5500

 const app = express();
 const mongoConnectionString = await Mongo.connect({mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME})
 console.log(mongoConnectionString)

 app.use(express.json());
 app.use(cors());

 app.get('/', (req, res) => {
    res.send({
        sucess: true,
        statusCode: 200,
        body: 'Bem vindo'

    })
 })

 app.use('/auth', authRouter)
 app.use('/users', usersRouter)
 app.use('/plates', platesRouter)
 app.use('/orders', ordersRouter)
 // Rotas de usuários, protegidas por autenticação


 app.listen(port, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
 })

}
main()