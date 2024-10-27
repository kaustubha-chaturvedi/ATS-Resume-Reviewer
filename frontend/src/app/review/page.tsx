"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense, useEffect, useState } from "react";
import "./style.css";
import { Progress } from "@/components/ui/progress";
import { usePdfContext } from "../../../context/pdfContext";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";

function Review() {
  const [review, setReview] = useState<string>();
  const { pdfBlob } = usePdfContext();
  useEffect(() => {
    setTimeout(() => {
      setReview(`${pdfBlob}`);
    }, 3000);
  }, []);

  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  if (!pdfBlob) {
    return <p>No PDF to display</p>;
  }

  return (
    <div className="container">
      <Card className="card">
        <iframe src={pdfUrl} width="600" height="800" />
      </Card>

      <Card className="card">
        {!review ? (
          <>
            <CardHeader>'please wait....'</CardHeader>
          </>
        ) : (
          <ReactMarkdown>{sampleMD}</ReactMarkdown>
        )}
      </Card>
    </div>
  );
}

export default Review;

var sampleMD = `
*You will like those projects!*

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules`;
