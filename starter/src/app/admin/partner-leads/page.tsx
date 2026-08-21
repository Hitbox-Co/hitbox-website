import { DataTable } from "@/components/admin/DataTable";
import { leadStatuses, partnerLeadColumns, partnerLeadRows } from "@/data/admin";

export default function AdminPartnerLeadsPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Business partner leads</h1>
      <p className="mt-3 text-[15px] text-muted">
        Partnership requests submitted by businesses.
      </p>

      <div className="mt-9">
        <DataTable
          columns={partnerLeadColumns}
          rows={partnerLeadRows}
          filterKey="status"
          filterOptions={leadStatuses}
          exportName="hitbox-partner-leads"
          emptyMessage="No business partner inquiries yet."
        />
      </div>
    </>
  );
}
