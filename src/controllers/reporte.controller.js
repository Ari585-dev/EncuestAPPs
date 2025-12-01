import { ReporteModel } from "../models/Reporte.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

// Función auxiliar para humanizar las fechas
const formatFecha = (fechaString) => {
    if (!fechaString) return "";
    try {
        const date = new Date(fechaString);
        // Opciones de formato (ej: 24 de noviembre de 2025)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    } catch (e) {
        return fechaString; // Retorna el string original si hay error
    }
};

// Función auxiliar para generar el nombre de archivo con formato REPORTE_YYYYMMDDhhmm
const generarNombreArchivo = (tipo) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // El nombre de archivo es REPORTE_YYYYMMDDhhmm.xlsx o .pdf
    return `REPORTE_${year}${month}${day}${hours}${minutes}.${tipo}`;
};


export const ReporteController = {

    // -----------------------------
    // EXPORTACIÓN A EXCEL COMPLETO CON COLORES POR USUARIO
    // -----------------------------
    exportExcel: (req, res) => {
        const { idEmpresa } = req.params;
        const nombreArchivo = generarNombreArchivo('xlsx'); // Generar nombre

        ReporteModel.obtenerEncuestasPorEmpresa(idEmpresa, async (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("EncuestasCompletas");

            // Columnas (sin idUsuario)
            sheet.columns = [
                { header: "Encuesta", key: "encuesta", width: 30 },
                { header: "Descripción Encuesta", key: "encuesta_descripcion", width: 40 },
                { header: "Fecha Inicio", key: "fechaInicio", width: 15 },
                { header: "Fecha Fin", key: "fechaFin", width: 15 },
                { header: "Estado", key: "estado", width: 12 },
                { header: "Pregunta", key: "pregunta", width: 40 },
                { header: "Tipo Pregunta", key: "tipo_pregunta", width: 15 },
                { header: "Respuesta", key: "respuesta", width: 30 },
            ];

            // Generar colores por usuario
            const userColors = {};
            const colors = ["FFB6C1", "ADD8E6", "90EE90", "FFFF99", "FFA07A", "D8BFD8", "FFDEAD", "E0FFFF"];
            let colorIndex = 0;

            rows.forEach(r => {
                // Asignar color a cada usuario
                if (r.idUsuario !== null && !userColors[r.idUsuario]) {
                    userColors[r.idUsuario] = colors[colorIndex % colors.length];
                    colorIndex++;
                }

                const rowData = {
                    encuesta: r.encuesta,
                    encuesta_descripcion: r.encuesta_descripcion,
                    fechaInicio: r.fechaInicio,
                    fechaFin: r.fechaFin,
                    estado: r.estado,
                    pregunta: r.pregunta,
                    tipo_pregunta: r.tipo_pregunta,
                    respuesta: r.respuesta,
                };

                const row = sheet.addRow(rowData);
                
                // Aplicar color de fondo a *toda la fila* si existe un idUsuario
                if (r.idUsuario !== null) {
                    const rowFill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: userColors[r.idUsuario] }
                    };

                    // Itera sobre cada celda de la fila para aplicar el color
                    row.eachCell({ includeEmpty: false }, (cell) => {
                        cell.fill = rowFill;
                    });
                }
            });

            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            // Usar la variable generada para el nombre
            res.setHeader("Content-Disposition", `attachment; filename=${nombreArchivo}`); 
            res.send(buffer);
        });
    },

    // -----------------------------
    // EXPORTACIÓN A PDF COMPLETO
    // -----------------------------
    exportPDF: (req, res) => {
        const { idEmpresa } = req.params;
        const nombreArchivo = generarNombreArchivo('pdf'); // Generar nombre

        ReporteModel.obtenerEncuestasPorEmpresa(idEmpresa, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const doc = new PDFDocument({ margin: 30, size: "A4" });

            res.setHeader("Content-Type", "application/pdf");
            // Usar la variable generada para el nombre
            res.setHeader("Content-Disposition", `attachment; filename=${nombreArchivo}`);

            doc.pipe(res);

            let currentEncuestaId = null;
            let currentPreguntaId = null;

            rows.forEach(r => {
                if (currentEncuestaId !== r.idEncuesta) {
                    if (currentEncuestaId !== null) doc.addPage();
                    
                    // Fechas humanizadas aquí
                    const fechaInicioHumana = formatFecha(r.fechaInicio);
                    const fechaFinHumana = formatFecha(r.fechaFin);
                    
                    doc.fontSize(18).text(`Encuesta: ${r.encuesta}`, { underline: true });
                    if (r.encuesta_descripcion) doc.fontSize(12).text(r.encuesta_descripcion);
                    
                    // Usar fechas humanizadas en el PDF
                    doc.fontSize(12).text(`Fecha Inicio: ${fechaInicioHumana} | Fecha Fin: ${fechaFinHumana} | Estado: ${r.estado || ""}`);
                    doc.moveDown();
                    
                    currentEncuestaId = r.idEncuesta;
                    currentPreguntaId = null;
                }

                if (currentPreguntaId !== r.idPregunta) {
                    doc.fontSize(14).text(`Pregunta: ${r.pregunta} (${r.tipo_pregunta})`, { indent: 10 });
                    currentPreguntaId = r.idPregunta;
                }

                // **LÍNEA CORREGIDA:** Se eliminó `(Usuario ID: ${r.idUsuario || "N/A"})`
                if (r.respuesta) doc.fontSize(12).text(`Respuesta: ${r.respuesta}`, { indent: 20 });
                doc.moveDown(0.5);
            });

            doc.end();
        });
    }
};