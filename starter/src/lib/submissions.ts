import { NextResponse } from "next/server";

export type SubmissionKind = "waitlist" | "artist-inquiry" | "business-inquiry" | "contact";

type FieldRule = {
  name: string;
  label: string;
  /** Validates shape beyond "is present". */
  type?: "email";
};

/**
 * Server-side validation and intake for every form on the site.
 *
 * NOTE FOR PHASE 2 — this currently validates the payload and logs it. Before
 * launch, replace the marked section with:
 *   1. persistence (database insert, so the admin dashboard has real rows),
 *   2. an internal notification to the HitBox team,
 *   3. a confirmation email to the submitter.
 * The validated `data` object is the only thing those three steps need.
 */
export async function handleSubmission(
  request: Request,
  kind: SubmissionKind,
  required: FieldRule[],
) {
  let data: Record<string, unknown>;

  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const rule of required) {
    const value = String(data[rule.name] ?? "").trim();

    if (!value) {
      return NextResponse.json({ error: `${rule.label} is required.` }, { status: 422 });
    }

    if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 422 },
      );
    }
  }

  // --- Replace this block in Phase 2 -------------------------------------
  console.info(`[${kind}] submission received`, {
    ...data,
    receivedAt: new Date().toISOString(),
  });
  // -----------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
