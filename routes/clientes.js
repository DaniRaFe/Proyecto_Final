const {Router} = require("express")
const { getClien, getClientesByID,deleteClientesByID, addClientes,updateClientesByUsuario} = require("../controllers/clientes")
const router = Router()

//vamos a definir las rutas del localhost 
//http://localhost:4005/api/v1/clientes
// http://localhost:4005/api/v1/clientes?id=3

//GET//
router.get("/", getClien) //consultar
router.get("/id/:id", getClientesByID) //buscar por id

//DELETE//
router.delete("/", deleteClientesByID) //eliminar

//POST//
router.post("/", addClientes)//agregar

//put//
router.put("/", updateClientesByUsuario) //actualizar




module.exports = router