const express = require("express");
const routerServer = require("./router/router.js");

const port = 8000;
const app = express();

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
