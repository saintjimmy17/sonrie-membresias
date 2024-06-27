import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public async downloadDivAsPDF(divId: string, pdfFileName: string) {
    const div = document.getElementById(divId);
    if (div) {
      try {
        // Espera a que todas las imágenes se carguen
        await this.loadImages(div);

        // Convertir SVG a imágenes rasterizadas
        await this.convertSvgToPng(div);

        // Captura el div como un canvas
        const canvas = await html2canvas(div, {
          scale: 2, // Ajusta la escala para mejorar la calidad
          useCORS: true // Permitir imágenes de diferentes orígenes
        });

        // Genera el PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(pdfFileName);
      } catch (error) {
        console.error('Error al generar el PDF:', error);
      }
    } else {
      console.error(`Element with id ${divId} not found`);
    }
  }

  private async convertSvgToPng(element: HTMLElement): Promise<void> {
    const svgs = Array.from(element.getElementsByTagName('svg'));
    for (const svg of svgs) {
      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngData = canvas.toDataURL('image/png');
            const pngImg = new Image();
            pngImg.onload = () => {
              // Reemplaza el SVG con la imagen PNG renderizada
              svg.replaceWith(pngImg);
              URL.revokeObjectURL(url);
              resolve();
            };
            pngImg.src = pngData;
          };
          img.onerror = () => {
            console.error('Failed to convert SVG to PNG:', svg);
            URL.revokeObjectURL(url);
            reject(new Error('Failed to convert SVG to PNG'));
          };
          img.src = url;
        });
      } catch (error) {
        console.error('Error converting SVG to PNG:', error);
      }
    }
  }

  private async loadImages(element: HTMLElement): Promise<void> {
    const images = Array.from(element.getElementsByTagName('img'));
    const promises = images.map(img => {
      return new Promise<void>((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
        }
      });
    });
    return Promise.all(promises).then(() => {});
  }
}
