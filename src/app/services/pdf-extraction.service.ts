import { Injectable } from '@angular/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfExtractionService {
  constructor() {
    GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
  }

  async extractTextFromPdf(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          console.log(reader.result);
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const textDecoder = new TextDecoder('utf-8'); // Default encoding is 'utf-8'
          console.log(textDecoder.decode(typedArray));

          const pdf = await getDocument(typedArray).promise;
          let fullText = '';
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
              .map((item: any) => (item.str ? item.str : ''))
              .join(' ');
            fullText += pageText + '\n';
          }

          resolve(fullText);
        } catch (error) {
          reject(`Error extracting text from PDF: ${error}`);
        }
      };

      reader.onerror = () => {
        reject('Failed to read the PDF file.');
      };

      reader.readAsArrayBuffer(file);
    });
  }
  
}
