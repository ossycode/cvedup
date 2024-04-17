import pdfkit from "pdfkit";
import fs from "fs";

export async function generatePDFFromHTMLPDFKIT(
  htmlContent: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdfBuffer: Buffer[] = [];
    const doc = new pdfkit();

    doc.on("data", (chunk) => {
      pdfBuffer.push(chunk);
    });

    doc.on("end", () => {
      const pdfData = Buffer.concat(pdfBuffer);
      resolve(pdfData);
    });

    doc.on("error", (err) => {
      reject(err);
    });

    doc.text(htmlContent);
    doc.end();
  });
}
