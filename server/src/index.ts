import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { htmlContent } from "./handlebars";
import { generatePDFFromHTML } from "./puppeteer";
import fs from "fs";
import path from "path";
import { generatePDFFromHTMLPDFKIT } from "./pdfkit";
import { generatePDFfromURL } from "./jspdf";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "./public")));
app.use("/images", express.static(path.join(__dirname, "dev-data", "images")));

// app.get("/", (req, res) => {
//   res.send("Express + TypeScript Server");
// });

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(htmlContent);
});

app.get("/test", async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await generatePDFFromHTMLPDFKIT(htmlContent);
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.get("/pdf/:id", (req, res) => {
  const id = req.params.id;
  const pdfPath = path.join(__dirname, `../output/${id}.pdf`);

  // Read the PDF file into memory
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error("Error reading PDF file:", err);
      return res.status(500).send("Error reading PDF file");
    }
    // Send the PDF content as the response
    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
});

app.get("/pdf", async (req, res) => {
  const fileName = `${Date.now().toFixed(0)}.pdf`;
  const cvOutput = "./output/";
  if (!fs.existsSync(cvOutput)) {
    fs.mkdirSync(cvOutput);
  }
  const outputPath = `${cvOutput}${fileName}`;

  try {
    // Generate PDF from HTML content
    // await generatePDFFromHTML(htmlContent, outputPath);
    await generatePDFfromURL(htmlContent, outputPath);
    res.send("PDF generated successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
