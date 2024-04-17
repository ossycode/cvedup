import jsPDF from "jspdf";

export async function generatePDFfromURL(url: string, outputPath: string) {
  try {
    const doc = new jsPDF();
    doc.text(url, 10, 10);
    doc.save(outputPath);
    console.log("PDF generated successfully");
  } catch (error) {
    console.error("Error fetching URL:", error);
  }
}
