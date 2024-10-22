// PDFViewer.tsx
import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {

  const defaultLayout = defaultLayoutPlugin();

  return (
    <div className="h-[50vh] w-full">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayout]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
