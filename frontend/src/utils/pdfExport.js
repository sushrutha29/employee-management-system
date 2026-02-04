const jsPdfUrl = "https://cdn.jsdelivr.net/npm/jspdf@4.1.0/dist/jspdf.umd.min.js";
const autoTableUrl = "https://cdn.jsdelivr.net/npm/jspdf-autotable@5.0.7/dist/jspdf.plugin.autotable.min.js";

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
    });

export async function exportTableToPdf({ title, columns, rows, fileName }) {
    if (!rows || rows.length === 0) {
        throw new Error("No data to export");
    }
    await loadScript(jsPdfUrl);
    await loadScript(autoTableUrl);

    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
        throw new Error("jsPDF not available");
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 14, 16);

    if (typeof doc.autoTable !== "function") {
        throw new Error("autoTable plugin not available");
    }

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 22,
    });
    doc.save(fileName);
}