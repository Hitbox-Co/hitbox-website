import { handleSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  return handleSubmission(request, "contact", [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "subject", label: "Subject" },
    { name: "message", label: "Message" },
  ]);
}
