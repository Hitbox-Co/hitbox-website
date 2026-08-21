import { DataTable } from "@/components/admin/DataTable";
import { waitlistColumns, waitlistRows } from "@/data/admin";

export default function AdminWaitlistPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Waitlist</h1>
      <p className="mt-3 text-[15px] text-muted">Everyone who has signed up for updates.</p>

      <div className="mt-9">
        <DataTable
          columns={waitlistColumns}
          rows={waitlistRows}
          exportName="hitbox-waitlist"
          emptyMessage="No waitlist signups yet."
        />
      </div>
    </>
  );
}
