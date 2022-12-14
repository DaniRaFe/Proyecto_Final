const express = require('express')
const clientesRouter = require('./routes/clientes')
const prestamosRouter = require('./routes/prestamos')
const cors = require("cors")

class Server{
    constructor() {
        this.app = express()
        this .paths = {
            clientes: "/api/v1/clientes",
            prestamos: "/api/v1/prestamos"
        }
        this.middlewares()
       this.routes()
       
    }

    routes() {
       // this.app.get('/', (req, res) => {
           // res.send('Hello World')
   // }) //End Point
   this.app.use(this.paths.clientes, clientesRouter)
   this.app.use(this.paths.prestamos, prestamosRouter)
}

middlewares(){
    this.app.use(cors()) //Permite solicitudes de origen cruzado
    this.app.use(express.json()) //Habilita la lectura de contenido en formato json
}

listen() {
    this.app.listen(process.env.PORT,() => {
        //console.log("Backend en ejecucion en el puerto", process.env.PORT)

        console.log(process.env.PORT);

    }) 
}
}

module.exports = Server