import { ReporteModel } from "../models/Reporte.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export const ReporteController = {

    // -----------------------------
    // EXPORTACIÓN A EXCEL COMPLETO
    // -----------------------------
    exportExcel: (req, res) => {
        const { idEmpresa } = req.params;

        ReporteModel.obtenerEncuestasPorEmpresa(idEmpresa, async (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("EncuestasCompletas");

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

            rows.forEach(r => {
                const rowData = {};
                for (const key in r) {
                    if (r[key] !== null) rowData[key] = r[key]; // solo valores no NULL
                }
                sheet.addRow(rowData);
            });

            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=report_encuestas_completo.xlsx");
            res.send(buffer);
        });
    },

    // -----------------------------
    // EXPORTACIÓN A PDF COMPLETO
    // -----------------------------
    exportPDF: (req, res) => {
        const { idEmpresa } = req.params;

        ReporteModel.obtenerEncuestasPorEmpresa(idEmpresa, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const doc = new PDFDocument({ margin: 30, size: "A4" });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=report_encuestas_completo.pdf");

            doc.pipe(res);

        let currentEncuestaId = null;
        let currentPreguntaId = null;

        rows.forEach(r => {
            // Nueva encuesta
            if (currentEncuestaId !== r.idEncuesta) {
                if (currentEncuestaId !== null) doc.addPage(); // nueva página solo después de la primera encuesta
                doc.fontSize(18).text(`Encuesta: ${r.encuesta}`, { underline: true });
                if (r.encuesta_descripcion) doc.fontSize(12).text(r.encuesta_descripcion);
                doc.fontSize(12).text(`Fecha Inicio: ${r.fechaInicio || ""} | Fecha Fin: ${r.fechaFin || ""} | Estado: ${r.estado || ""}`);
                doc.moveDown();
                currentEncuestaId = r.idEncuesta;
                currentPreguntaId = null;
            }

            // Nueva pregunta
            if (currentPreguntaId !== r.idPregunta) {
                doc.fontSize(14).text(`Pregunta: ${r.pregunta} (${r.tipo_pregunta})`, { indent: 10 });
                currentPreguntaId = r.idPregunta;
            }

            // Opción y respuesta
            if (r.respuesta) doc.fontSize(12).text(`Respuesta: ${r.respuesta}`, { indent: 20 });

            doc.moveDown(0.5);
        });


            doc.end();
        });
    }
};
