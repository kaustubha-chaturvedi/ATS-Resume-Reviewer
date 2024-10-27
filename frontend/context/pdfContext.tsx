"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PdfContextType {
  pdfBlob: Blob | null;
  setPdfBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const PdfContext = createContext<PdfContextType | undefined>(undefined);

export const PdfProvider = ({ children }: { children: ReactNode }) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  return (
    <PdfContext.Provider value={{ pdfBlob, setPdfBlob }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdfContext = () => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error("usePdfContext must be used within a PdfProvider");
  }
  return context;
};
