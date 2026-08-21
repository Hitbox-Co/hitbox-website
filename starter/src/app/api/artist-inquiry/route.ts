import { handleSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  return handleSubmission(request, "artist-inquiry", [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "artistName", label: "Artist / creator name" },
    { name: "projectIdea", label: "Project description" },
  ]);
}
