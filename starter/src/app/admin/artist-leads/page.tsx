import { DataTable } from "@/components/admin/DataTable";
import { artistLeadColumns, artistLeadRows, leadStatuses } from "@/data/admin";

export default function AdminArtistLeadsPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Artist leads</h1>
      <p className="mt-3 text-[15px] text-muted">
        Partnership requests submitted by artists and creators.
      </p>

      <div className="mt-9">
        <DataTable
          columns={artistLeadColumns}
          rows={artistLeadRows}
          filterKey="status"
          filterOptions={leadStatuses}
          exportName="hitbox-artist-leads"
          emptyMessage="No artist inquiries yet."
        />
      </div>
    </>
  );
}
