"use client";

import React, { useState, useMemo } from "react";
import { Program, Brand, ProgramStatus, PROGRAM_STATUSES } from "@/lib/types";
import { ProgramCard } from "./program-card";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ProgramDialog } from "./program-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type KanbanBoardProps = {
  initialPrograms: Program[];
  brands: Brand[];
};

export function KanbanBoard({ initialPrograms, brands }: KanbanBoardProps) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const brandMatch = brandFilter === "all" || program.brandId === brandFilter;
      const searchMatch = searchTerm === "" || program.type.toLowerCase().includes(searchTerm.toLowerCase());
      return brandMatch && searchMatch;
    });
  }, [programs, searchTerm, brandFilter]);

  const handleAddProgram = () => {
    setSelectedProgram(null);
    setIsDialogOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setSelectedProgram(program);
    setIsDialogOpen(true);
  }

  const handleDeleteProgram = (programId: string) => {
    setPrograms(programs.filter(p => p.id !== programId));
  }
  
  const handleSaveProgram = (programData: Program) => {
    if(selectedProgram) {
      setPrograms(programs.map(p => p.id === programData.id ? programData : p));
    } else {
      setPrograms([...programs, {...programData, id: `prog-${Date.now()}`}]);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 gap-4 flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-48"
            />
          </div>
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch id="view-toggle" checked={view === 'kanban'} onCheckedChange={(checked) => setView(checked ? 'kanban' : 'list')} />
            <Label htmlFor="view-toggle">Kanban View</Label>
          </div>
        </div>
        <Button onClick={handleAddProgram}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Program
        </Button>
      </div>
      
      {view === 'kanban' ? (
        <div className="flex-1 grid md:grid-cols-3 gap-6 overflow-y-auto">
          {PROGRAM_STATUSES.map((status) => (
            <div key={status} className="bg-muted/50 rounded-lg p-4 flex flex-col">
              <h3 className="text-lg font-semibold mb-4 capitalize">{status}</h3>
              <div className="space-y-4 overflow-y-auto flex-1">
                {filteredPrograms
                  .filter((p) => p.status === status)
                  .map((program) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      brand={brands.find(b => b.id === program.brandId)}
                      onEdit={handleEditProgram}
                      onDelete={handleDeleteProgram}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
             {filteredPrograms.map((program) => (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  brand={brands.find(b => b.id === program.brandId)}
                  onEdit={handleEditProgram}
                  onDelete={handleDeleteProgram}
                />
              ))}
          </div>
        </div>
      )}

      <ProgramDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        program={selectedProgram}
        brands={brands}
        onSave={handleSaveProgram}
      />
    </div>
  );
}
