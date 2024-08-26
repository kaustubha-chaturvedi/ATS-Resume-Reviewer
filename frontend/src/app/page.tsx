import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function Home() {
	return (
		<main className="flex flex-col gap-4 items-center justify-center h-screen w-100">
			<h1 className="text-4xl font-bold text-center">Resume Reviewer</h1>
			<form action="/upload/" method="POST" className="w-full max-w-4xl mx-auto space-y-4 flex flex-col gap-1">
				<label htmlFor="file">Upload your CV</label>
				<input type="file"
					id="file"
					name="file"
					className="text-sm text-grey-500
						file:mr-5 file:py-2 file:px-6
						file:rounded-full file:border-0
						file:text-sm file:font-medium
						file:bg-blue-50 file:text-blue-700
						hover:file:cursor-pointer hover:file:bg-amber-50
						hover:file:text-amber-700 border-2 p-2 rounded-md"
				/>
				<label htmlFor="job_desc">Enter job description</label>
				<Textarea id="job_desc" name="job_desc" className="w-full max-w-4xl mx-auto" />
				<Button type="submit" variant="outline">Submit</Button>
			</form>
		</main>
	);
}
