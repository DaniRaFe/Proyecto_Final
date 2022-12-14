const modeloPrestamos = {
    queryGetPrestamos: "SELECT * FROM PRESTAMOSMATE", 
    queryGetPrestamosByID:`SELECT * FROM PRESTAMOSMATE WHERE ID = ?`,
    queryDeleteByID: `UPDATE PRESTAMOSMATE SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Material FROM PRESTAMOSMATE WHERE Material = ?`,
    queryAddPrestamos: `INSERT INTO PRESTAMOSMATE (
        Material,
        Marca,
        Modelo,
        Fecha_Solicitud,
        Fecha_Entrega,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    ) `,
    queryGetPrestamosInfo: `SELECT Material, Marca, Modelo, Fecha_Solicitud, Fecha_Entrega, Activo
    FROM PRESTAMOSMATE
    WHERE Material = ?
    `,
    queryUpdateByMateriales: `
    UPDATE PRESTAMOSMATE SET 
        Marca = ?,
        Modelo = ?,
        Fecha_Solicitud = ?,
        Fecha_Entrega = ?,
        Activo = ?
    WHERE Material = ?
    `,

}

module.exports = modeloPrestamos