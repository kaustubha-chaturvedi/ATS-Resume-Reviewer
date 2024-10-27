"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { usePdfContext } from "../../context/pdfContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setPdfBlob } = usePdfContext();
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDesc(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      const pdfBlob = new Blob([file], { type: "application/pdf" });
      setPdfBlob(pdfBlob);
    }

    // Navigate to the review page
    router.push("/review");
  };

  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen w-100">
      <h1 className="text-4xl font-bold text-center">Resume Reviewer</h1>
      <form
        className="w-full max-w-4xl mx-auto space-y-4 flex flex-col gap-1"
        onSubmit={handleSubmit}
      >
        <label htmlFor="file">Upload your CV</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-sm text-grey-500
              file:mr-5 file:py-2 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:cursor-pointer hover:file:bg-amber-50
              hover:file:text-amber-700 border-2 p-2 rounded-md"
          required
        />
        <label htmlFor="job_desc">Enter job description</label>
        <Textarea
          id="job_desc"
          name="job_desc"
          value={jobDesc}
          onChange={handleJobDescChange}
          className="w-full max-w-4xl mx-auto"
        />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </main>
  );
}
