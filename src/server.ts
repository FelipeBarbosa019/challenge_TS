const express = require("express");
const routerServer = require("./router/router.js");
const cookieParser = require('cookieParser')

require('dotenv').config()

const port = process.env.SERVER_PORT;
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerServer);

app.listen(port, (err: never) => {
    if (err) {
        console.warn("Problema na conexão com o servidor.");
    } else {
        console.log("Servidor ativo na porta:", port);
    }
});
