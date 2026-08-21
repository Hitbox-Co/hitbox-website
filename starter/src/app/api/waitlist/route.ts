import { handleSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  return handleSubmission(request, "waitlist", [
    { name: "firstName", label: "First name" },
    { name: "email", label: "Email address", type: "email" },
    { name: "consent", label: "Consent" },
  ]);
}
