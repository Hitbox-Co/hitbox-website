"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { Select, TextInput } from "@/components/ui/Field";
import type { AdminRow, Column } from "@/data/admin";
import { cn } from "@/lib/utils";

type DataTableProps = {
  columns: Column[];
  rows: AdminRow[];
  /** Column key the filter dropdown applies to, e.g. "status". */
  filterKey?: string;
  filterOptions?: string[];
  /** File name stem used by the CSV export. */
  exportName: string;
  emptyMessage: string;
};

/**
 * Search, filter, sort and CSV export over a lead table. Everything runs
 * client-side against the rows it is given, so wiring it to a real data
 * source later means changing only the `rows` prop.
 */
export function DataTable({
  columns,
  rows,
  filterKey,
  filterOptions,
  exportName,
  emptyMessage,
}: DataTableProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState(columns[0]?.key ?? "");
  const [ascending, setAscending] = useState(true);

  const visibleRows = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = rows.filter((row) => {
      const matchesQuery =
        !term || Object.values(row).some((value) => value.toLowerCase().includes(term));
      const matchesFilter = !filter || !filterKey || row[filterKey] === filter;
      return matchesQuery && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      const result = (a[sortKey] ?? "").localeCompare(b[sortKey] ?? "");
      return ascending ? result : -result;
    });
  }, [rows, query, filter, filterKey, sortKey, ascending]);

  function exportCsv() {
    const header = columns.map((column) => column.label);
    const body = visibleRows.map((row) =>
      columns.map((column) => `"${(row[column.key] ?? "").replace(/"/g, '""')}"`),
    );

    const csv = [header.join(","), ...body.map((line) => line.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <TextInput
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search…"
          aria-label="Search records"
          className="sm:max-w-xs"
        />

        {filterKey && filterOptions?.length ? (
          <Select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter records"
            className="sm:max-w-45"
          >
            <option value="">All statuses</option>
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ) : null}

        <Button
          type="button"
          onClick={exportCsv}
          variant="secondary"
          size="md"
          className="sm:ml-auto"
          disabled={visibleRows.length === 0}
        >
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-card border border-line bg-ink-soft">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {columns.map((column) => {
                const active = sortKey === column.key;

                return (
                  <th key={column.key} scope="col" className={cn("p-0", column.wide && "w-1/4")}>
                    <button
                      type="button"
                      onClick={() => {
                        if (active) setAscending((value) => !value);
                        else {
                          setSortKey(column.key);
                          setAscending(true);
                        }
                      }}
                      aria-sort={active ? (ascending ? "ascending" : "descending") : "none"}
                      className="flex w-full items-center gap-1.5 px-4 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
                    >
                      {column.label}
                      <ChevronDownIcon
                        className={cn(
                          "size-3.5 transition-all",
                          active ? "text-fg" : "text-subtle opacity-0",
                          active && !ascending && "rotate-180",
                        )}
                      />
                    </button>
                  </th>
                );
              })}
              <th scope="col" className="px-4 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Notes
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-16 text-center">
                  <p className="text-sm text-muted">{emptyMessage}</p>
                  <p className="mt-2 text-xs text-subtle">
                    Records appear here once form submissions are being saved.
                  </p>
                </td>
              </tr>
            ) : (
              visibleRows.map((row, index) => (
                <tr key={index} className="border-b border-line last:border-0">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3.5 text-sm text-muted">
                      {row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3.5">
                    <button
                      type="button"
                      className="text-sm text-subtle underline decoration-fg/20 underline-offset-4 transition-colors hover:text-fg"
                    >
                      Add note
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-subtle">
        {visibleRows.length} {visibleRows.length === 1 ? "record" : "records"}
      </p>
    </div>
  );
}
