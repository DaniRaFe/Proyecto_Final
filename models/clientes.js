const modeloClientes = {
    queryGetClien: "SELECT * FROM CLIENTE", 
    queryGetClienByID:`SELECT * FROM CLIENTE WHERE ID = ?`,
    queryDeleteByID: `UPDATE CLIENTE SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Nombre FROM CLIENTE WHERE Nombre = ?`,
    queryAddClientes: `INSERT INTO CLIENTE (
       Nombre,
       Apellidos,
       Edad,
       Genero,
       Direccion,
       Telefono,
       Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    ) `,
    queryGetClienInfo: `SELECT Nombre, Apellidos, Edad, Genero, Direccion, Telefono, Activo
    FROM CLIENTE
    WHERE Nombre = ?
    `,
    queryUpdateByClientes: `
    UPDATE CLIENTE SET 
       Apellidos =?,
       Edad = ?,
       Genero = ?,
       Direccion = ?,
       Telefono = ?,
       Activo =?
    WHERE Nombre = ?
    `,

}

module.exports = modeloClientes