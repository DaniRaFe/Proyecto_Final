const { request, response } = require("express");
const pool = require("../db/connection")
const bcryptjs= require("bcryptjs");
const modeloPrestamos= require("../models/prestamos");
const getPrestamos = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const Prestamos = await conn.query(modeloPrestamos.queryGetPrestamos, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Prestamos) {
            res.status(404).json({msg:"no se encontraron registros del prestamo de material"})
            return
        }
        res.json({Prestamos})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}




const getPrestamosByID = async (req = request, res = response) =>{
    const {id} = req.params
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [Prestamos] = await conn.query(modeloPrestamos.queryGetPrestamosByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Prestamos) {
            res.status(404).json({msg:`no se encontro el registro del prestamo del material con el ID ${id}`})
            return
        }
        res.json({Prestamos})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deletePrestamosByID = async (req = request, res = response) =>{
    const {id} = req.query
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const {affectedRows} = await conn.query(modeloPrestamos.queryDeleteByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo eliminar el registro del prestamo de material con el ID ${id}`})
            return
        }
        res.json({msg: `El prestamo del material con el id ${id} se elimino correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addPrestamos = async (req = request, res = response) =>{
    const {
       Material,
       Marca,
       Modelo,
       Fecha_Solicitud,
       Fecha_Entrega,
       Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
       !Material||
       !Marca||
       !Modelo||
       !Fecha_Solicitud||
       !Fecha_Entrega||
       !Activo
        ) {
            res.status(400).json({msg: "Falta informacion del   Prestamo de Material"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Prestamos] = await conn.query(modeloPrestamos.queryUserExists, [Material])
        if (Prestamos) {
            res.status(403).json({msg: `El prestamo del ${Material} ya se encuentra registrada`})
            return
        }
        const salt = bcryptjs.genSaltSync()
        const {affectedRows} = await conn.query(modeloPrestamos.queryAddPrestamos, [
            Material,
            Marca,
            Modelo,
            Fecha_Solicitud,
            Fecha_Entrega,
            Activo
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo agregar el registro del prestamo ${Material}`})
            return
        }
        res.json({msg: `El prestamo del ${Material} se agrego correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updatePrestamosByUsuario = async (req = request, res = response) =>{
    const {
        Material,
        Marca,
        Modelo,
        Fecha_Solicitud,
        Fecha_Entrega,
        Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Material
        ) {
            res.status(400).json({msg: "Falta informacion del prestamo del material"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Prestamos] = await conn.query(modeloPrestamos.queryGetPrestamosInfo,[Material])

        if (!Prestamos) {
            res.status(403).json({msg: `El prestamo del ${Material} no se encuentra registrada`})
            return
        }
        const {affectedRows} = await conn.query(modeloPrestamos.queryUpdateByMateriales, [ 
            Modelo|| Prestamos.Modelo,
            Fecha_Solicitud|| Prestamos.Fecha_Solicitud,
            Fecha_Entrega|| Prestamos.Fecha_Entrega,
            Marca|| Prestamos.Marca,
            Activo|| Prestamos.Activo,
            Material
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del prestamo del ${Material}`})
            return
        }
        res.json({msg: `El prestamo del ${Material} se actualizo correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports = {getPrestamos, getPrestamosByID, deletePrestamosByID, addPrestamos, updatePrestamosByUsuario}