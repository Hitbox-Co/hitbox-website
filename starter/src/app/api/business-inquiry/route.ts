import { handleSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  return handleSubmission(request, "business-inquiry", [
    { name: "name", label: "Name" },
    { name: "company", label: "Company" },
    { name: "email", label: "Email", type: "email" },
    { name: "partnershipType", label: "Partnership type" },
    { name: "projectDetails", label: "Project details" },
  ]);
}
