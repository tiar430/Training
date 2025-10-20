"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Program, Brand } from "@/lib/types";
import { PROGRAM_STATUSES, PROGRAM_TYPES } from "@/lib/types";
import { useState, useEffect } from "react";

type ProgramDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  program: Program | null;
  brands: Brand[];
  onSave: (program: Program) => void;
};

export function ProgramDialog({ isOpen, setIsOpen, program, brands, onSave }: ProgramDialogProps) {
  const [formData, setFormData] = useState<Partial<Program>>({});

  useEffect(() => {
    if (program) {
      setFormData(program);
    } else {
      setFormData({
        name: "",
        brandId: "",
        type: PROGRAM_TYPES[0],
        status: "Backlog",
        achievement: 0,
      });
    }
  }, [program, isOpen]);

  const handleChange = (field: keyof Program, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    onSave(formData as Program);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{program ? "Edit Program" : "Add Program"}</DialogTitle>
          <DialogDescription>
            {program ? "Update the details of this program." : "Create a new program for a brand."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">Brand</Label>
            <Select value={formData.brandId} onValueChange={(value) => handleChange('brandId', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="achievement" className="text-right">Achievement</Label>
            <div className="col-span-3 flex items-center gap-4">
              <Slider
                id="achievement"
                min={0}
                max={100}
                step={1}
                value={[formData.achievement || 0]}
                onValueChange={(value) => handleChange('achievement', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center text-sm font-medium">{formData.achievement || 0}%</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
