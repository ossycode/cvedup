import puppeteer from "puppeteer";
import { htmlContent } from "./handlebars";
import fs from "fs";

export async function generatePDFFromHTML(
  htmlContent: string,
  outputPath: string
): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent);

  // Get height of content
  const { height } = await page.evaluate(() => {
    const { body } = document;
    const height = body.scrollHeight;
    return { height };
  });

  // Check if content height exceeds 29.7cm
  if (height > 29.7 * 28.35) {
    // Convert 29.7cm to pixels
    // Calculate number of pages needed
    const totalPages = Math.ceil(height / (29.7 * 28.35)); // Assuming A4 size, where 1cm = 28.35px

    // Loop to generate additional pages
    for (let i = 1; i < totalPages; i++) {
      // Append additional page
      await page.evaluate(() => {
        document.body.innerHTML += '<page size="A4"></page>';
      });
    }
  }

  await page.pdf({
    path: outputPath,
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: "0.4in",
      bottom: "0.4in",
      left: "0.4in",
      right: "0.4in",
    },
  });

  await browser.close();
}

// const outputPath = "./output/sample-cv.pdf";

// generatePDFFromHTML(htmlContent, outputPath)
//   .then(() => console.log("PDF generated successfully"))
//   .catch((error) => console.error("Error generating PDF:", error));
