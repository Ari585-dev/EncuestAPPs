import connection from "../config/database.js";

export const ReporteModel = {
    obtenerEncuestasPorEmpresa: (idEmpresa, callback) => {
        const sql = `
SELECT 
    e.idEncuesta,
    e.titulo AS encuesta,
    e.descripcion AS encuesta_descripcion,
    e.fechaInicio,
    e.fechaFin,
    e.estado,
    
    p.idPregunta,
    p.texto AS pregunta,
    p.tipo AS tipo_pregunta,
    p.orden AS orden_pregunta,

    r.respuestaTexto AS respuesta

FROM encuesta e
LEFT JOIN pregunta p ON p.idEncuesta = e.idEncuesta
LEFT JOIN respuesta_pregunta r ON r.idPregunta = p.idPregunta
WHERE e.idEmpresa = ?
ORDER BY e.idEncuesta, p.orden;

`;

        connection.query(sql, [idEmpresa], callback);
    }
};