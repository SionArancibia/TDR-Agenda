// PDFViewer.tsx
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  base64String: string;
}

const base64toBlob = (data: string) => {
  // Cortar el prefijo 'data:application/pdf;base64,' si existe
  const base64WithoutPrefix = data.startsWith('data:application/pdf;base64,') 
    ? data.substr('data:application/pdf;base64,'.length) 
    : data;

  const bytes = atob(base64WithoutPrefix); // Decodificar Base64
  const byteArray = new Uint8Array(bytes.length);

  // Llenar el array con los valores de cada byte
  for (let i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  return new Blob([byteArray], { type: 'application/pdf' });
};


const PDFViewer: React.FC<PDFViewerProps> = ({ base64String }) => {

  //const defaultLayout = defaultLayoutPlugin();
  // `base64String` is the given base 64 data
  console.log(base64String)
  const blob = base64toBlob(base64String);
  const url = URL.createObjectURL(blob);

  return (
    <div className="h-[50vh] w-full">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={url}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
