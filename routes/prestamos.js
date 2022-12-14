const {Router} = require("express")
const { getPrestamos, getPrestamosByID, deletePrestamosByID, addPrestamos, updatePrestamosByUsuario } = require("../controllers/prestamos")
const router = Router()

//vamos a definir las rutas del localhost 
//http://localhost:4005/api/v1/prestamos
// http://localhost:4005/api/v1/prestamos?id=3

//GET//
router.get("/", getPrestamos)
router.get("/id/:id", getPrestamosByID)

//DELETE//
router.delete("/", deletePrestamosByID)

//POST//
router.post("/", addPrestamos)

//put//
router.put("/", updatePrestamosByUsuario)




module.exports = router