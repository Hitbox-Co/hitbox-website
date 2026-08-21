import { DataTable } from "@/components/admin/DataTable";
import { leadStatuses, messageColumns, messageRows } from "@/data/admin";

export default function AdminMessagesPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Contact messages</h1>
      <p className="mt-3 text-[15px] text-muted">General enquiries sent through the contact form.</p>

      <div className="mt-9">
        <DataTable
          columns={messageColumns}
          rows={messageRows}
          filterKey="status"
          filterOptions={leadStatuses}
          exportName="hitbox-messages"
          emptyMessage="No messages yet."
        />
      </div>
    </>
  );
}
