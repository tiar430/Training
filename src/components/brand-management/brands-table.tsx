"use client";

import * as React from "react";
import Image from "next/image";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BrandDialog } from "./brand-dialog";
import type { Brand } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "../ui/card";

type BrandWithCount = Brand & { programCount: number };

export function BrandsTable({ data }: { data: BrandWithCount[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsDialogOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDialogOpen(true);
  };

  const handleDeleteBrand = (brandId: string) => {
    // In a real app, you'd call an API to delete the brand.
    console.log("Deleting brand:", brandId);
  };

  const columns: ColumnDef<BrandWithCount>[] = [
    {
      accessorKey: "name",
      header: "Brand",
      cell: ({ row }) => {
        const brand = row.original;
        const logo = PlaceHolderImages.find((img) => img.id === brand.logo);
        return (
          <div className="flex items-center gap-3">
            <Image
              src={logo?.imageUrl || ''}
              width={40}
              height={40}
              alt={brand.name}
              className="rounded-md"
              data-ai-hint={logo?.imageHint}
            />
            <span className="font-medium">{brand.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "programCount",
      header: "Programs",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("programCount")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleEditBrand(brand)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteBrand(brand.id)} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between pb-4">
          <Input
            placeholder="Filter brands..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button onClick={handleAddBrand}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Brand
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                          cell.getContext()
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <BrandDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          brand={selectedBrand}
        />
      </CardContent>
    </Card>
  );
}
