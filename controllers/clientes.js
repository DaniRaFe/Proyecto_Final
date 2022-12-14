const { request, response } = require("express");
const pool = require("../db/connection")
const bcryptjs= require("bcryptjs");
const modeloClientes= require("../models/clientes");
const getClien = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const Clientes = await conn.query(modeloClientes.queryGetClien, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Clientes) {
            res.status(404).json({msg:"no se encontraron registros del Cliente"})
            return
        }
        res.json({Clientes})
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




const getClientesByID = async (req = request, res = response) =>{
    const {id} = req.params
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [Clientes] = await conn.query(modeloClientes.queryGetClienByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Clientes) {
            res.status(404).json({msg:`no se encontro el registro del cliente con el ID ${id}`})
            return
        }
        res.json({Clientes})
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

const deleteClientesByID = async (req = request, res = response) =>{
    const {id} = req.query
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const {affectedRows} = await conn.query(modeloClientes.queryDeleteByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo eliminar el registro del cliente con el ID ${id}`})
            return
        }
        res.json({msg: `El cliente con id ${id} se elimino correctamente.`})
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

const addClientes = async (req = request, res = response) =>{
    const {
       Nombre,
       Apellidos,
       Edad,
       Genero,
       Direccion,
       Telefono,
       Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
       !Nombre ||
       !Apellidos ||
       !Edad ||
       !Genero ||
       !Direccion ||
       !Telefono ||
       !Activo
        ) {
            res.status(400).json({msg: "Falta informacion del Cliente"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Clientes] = await conn.query(modeloClientes.queryUserExists, [Nombre])
        if (Clientes) {
            res.status(403).json({msg: `El Cliente ${Nombre} ya se encuentra registrado`})
            return
        }
        
        const {affectedRows} = await conn.query(modeloClientes.queryAddClientes, [
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Direccion,
            Telefono,
            Activo
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo agregar el registro del cliente ${Nombre}`})
            return
        }
        res.json({msg: `El cliente ${Nombre} se agrego correctamente.`})
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

const updateClientesByUsuario = async (req = request, res = response) =>{
    const {
       Nombre,
       Apellidos,
       Edad,
       Genero,
       Direccion,
       Telefono,
       Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Nombre
        ) {
            res.status(400).json({msg: "Falta informacion del cliente"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Clientes] = await conn.query(modeloClientes.queryGetClienInfo,[Nombre])

        if (!Clientes) {
            res.status(403).json({msg: `El cliente ${Nombre} no se encuentra registrado`})
            return
        }
        const {affectedRows} = await conn.query(modeloClientes.queryUpdateByClientes, [ 
             Apellidos|| Clientes.Apellidos,
             Edad|| Clientes.Edad,
             Genero|| Clientes.Genero,
             Direccion|| Clientes.Direccion,
             Telefono|| Clientes.Telefono,
             Activo|| Clientes.Activo,
            Nombre
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del cliente ${Nombre}`})
            return
        }
        res.json({msg: `El cliente ${Nombre} se actualizo correctamente.`})
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


module.exports = {getClien, getClientesByID, deleteClientesByID, addClientes, updateClientesByUsuario}