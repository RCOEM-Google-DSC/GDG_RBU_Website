"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  LayoutGrid,
  TableIcon,
  ChevronDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Filter option type for configurable filters
export interface FilterOption {
  id: string; // Column accessor key to filter on
  label: string; // Display label for the filter
  options: { value: string; label: string }[]; // Available filter options
  placeholder?: string; // Placeholder text
  multiSelect?: boolean; // Allow multiple selections
}

// View mode type
export type ViewMode = "table" | "grid";

// Props for the standalone view toggle buttons
export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

// Standalone View Toggle component that can be used outside DataTable
export function ViewToggleButtons({
  viewMode,
  onViewModeChange,
}: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant={viewMode === "table" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-r-none"
        onClick={() => onViewModeChange("table")}
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "grid" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-l-none"
        onClick={() => onViewModeChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Hook to manage view mode state - can be used in parent component
export function useViewMode(defaultMode: ViewMode = "table") {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);
  return { viewMode, setViewMode };
}

// Generic GridView component for displaying data in a grid layout
export interface GridViewProps<TData> {
  data: TData[];
  renderCard?: (item: TData, index: number) => React.ReactNode;
  columns?: number; // Number of columns (default: 3)
  gap?: number; // Gap between cards in pixels (default: 16)
}

// Status color mapping
const getStatusStyle = (status: string) => {
  const s = status?.toLowerCase();
  if (s === "completed" || s === "done")
    return "bg-green-500/20 text-green-400 border-green-500/30";
  if (s === "in progress" || s === "in-progress")
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  if (s === "pending" || s === "todo")
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

// Priority color mapping
const getPriorityStyle = (priority: string) => {
  const p = priority?.toLowerCase();
  if (p === "high") return "bg-red-500/20 text-red-400 border-red-500/30";
  if (p === "medium")
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  if (p === "low") return "bg-green-500/20 text-green-400 border-green-500/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

// Format date for display
const formatDate = (date: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Get initials from name
const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function GridView<TData>({
  data,
  renderCard,
  columns = 3,
  gap = 16,
}: GridViewProps<TData>) {
  // Default card renderer matching the provided UI design
  const defaultRenderCard = (item: TData, index: number) => {
    const task = item as Record<string, unknown>;
    const title = (task.title as string) || "Untitled";
    const description = (task.description as string) || "";
    const status = (task.status as string) || "";
    const priority = (task.priority as string) || "";
    const tags = (task.tags as string[]) || [];
    const assignee =
      (task.assignee as string) || (task.assignTo as string) || "";
    const dueDate = (task.dueDate as string) || "";

    return (
      <div
        key={index}
        className="p-4 border border-border rounded-xl bg-card hover:border-muted-foreground/50 transition-all duration-200 flex flex-col gap-3"
      >
        {/* Header with title and menu */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{title}</h3>
          <button className="text-muted-foreground hover:text-foreground p-1 -mr-1 -mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            {""}
          </button>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Status and Priority badges */}
        {(status || priority) && (
          <div className="flex flex-row items-center gap-2">
            {status && (
              <span
                className={`text-xs px-2 py-1 rounded-md border ${getStatusStyle(status)}`}
              >
                {status.toLowerCase()}
              </span>
            )}
            {priority && (
              <span
                className={`text-xs px-2 py-1 rounded-md border ${getPriorityStyle(priority)}`}
              >
                {priority.toLowerCase()}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Assignee and Due Date */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {getInitials(assignee)}
              </div>
              <span className="text-sm text-muted-foreground">{assignee}</span>
            </div>
          ) : (
            <div />
          )}
          {dueDate && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              {formatDate(dueDate)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {data.map((item, index) => (
        <div key={index}>
          {renderCard
            ? renderCard(item, index)
            : defaultRenderCard(item, index)}
        </div>
      ))}
      {data.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No results.
        </div>
      )}
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: FilterOption[]; // Optional filter configurations
  showFilters?: boolean; // Show/hide filter section (default: true if filters provided)
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters = [],
  showFilters = true,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Track selected filter values for each filter (single select)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  // Track selected filter values for multi-select filters
  const [multiFilterValues, setMultiFilterValues] = useState<
    Record<string, string[]>
  >({});

  // Handle single-select filter change
  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));

    if (value === "all" || value === "") {
      setColumnFilters((prev) => prev.filter((f) => f.id !== filterId));
    } else {
      setColumnFilters((prev) => {
        const existing = prev.find((f) => f.id === filterId);
        if (existing) {
          return prev.map((f) => (f.id === filterId ? { ...f, value } : f));
        }
        return [...prev, { id: filterId, value }];
      });
    }
  };

  // Handle multi-select filter toggle
  const handleMultiFilterToggle = (filterId: string, value: string) => {
    setMultiFilterValues((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: updated };
    });
  };

  // Apply multi-select filters to data
  const filteredData = useMemo(() => {
    let result = data;
    Object.entries(multiFilterValues).forEach(([filterId, values]) => {
      if (values.length > 0) {
        result = result.filter((row: any) => {
          const cellValue = row[filterId];
          return values.includes(cellValue);
        });
      }
    });
    return result;
  }, [data, multiFilterValues]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      pagination,
      sorting,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasFilters = filters && filters.length > 0;

  return (
    <div>
      {/* Search and controls */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          <div className="max-w-sm">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full"
            />
          </div>
          {/* Filter selects - single select */}
          {hasFilters &&
            showFilters &&
            filters
              .filter((f) => !f.multiSelect)
              .map((filter) => (
                <Select
                  key={filter.id}
                  value={filterValues[filter.id] || "all"}
                  onValueChange={(val) => handleFilterChange(filter.id, val)}
                >
                  <SelectTrigger className="h-9 cursor-pointer w-auto rounded-md border border-input bg-background px-2 text-sm">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue
                      placeholder={filter.placeholder || filter.label}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
          {/* Multi-select filters */}
          {hasFilters &&
            showFilters &&
            filters
              .filter((f) => f.multiSelect)
              .map((filter) => {
                const selectedValues = multiFilterValues[filter.id] || [];
                const selectedCount = selectedValues.length;
                return (
                  <Popover key={filter.id}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-input"
                      >
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        {filter.label}
                        {selectedCount > 0 && (
                          <span className="ml-1 rounded-sm bg-primary px-1 text-xs text-primary-foreground">
                            {selectedCount}
                          </span>
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <div className="max-h-[300px] overflow-auto p-3 space-y-2">
                        {filter.options.map((opt) => {
                          const isSelected = selectedValues.includes(opt.value);
                          return (
                            <div
                              key={opt.value}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-muted rounded-sm p-1.5"
                              onClick={() =>
                                handleMultiFilterToggle(filter.id, opt.value)
                              }
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() =>
                                  handleMultiFilterToggle(filter.id, opt.value)
                                }
                              />
                              <label className="text-sm cursor-pointer flex-1">
                                {opt.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
        </div>
        <div className="flex items-center gap-2 ">
          <label className="text-sm text-muted-foreground">Rows</label>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(val) =>
              setPagination((p) => ({
                ...p,
                pageSize: Number(val),
                pageIndex: 0,
              }))
            }
          >
            <SelectTrigger className="h-8 cursor-pointer rounded-md border border-input bg-background px-2 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <button
                          className="flex items-center gap-2"
                          onClick={() =>
                            canSort && header.column.toggleSorting()
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort && (
                            <span className="ml-2">
                              {sortState === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : sortState === "desc" ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-50" />
                              )}
                            </span>
                          )}
                        </button>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <div className="px-3 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
