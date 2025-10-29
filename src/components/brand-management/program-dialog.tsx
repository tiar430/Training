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
import type { Program, Brand, IncentiveStatus } from "@/lib/types";
import { PROGRAM_STATUSES, PROGRAM_TYPES, REWARD_TYPES, INCENTIVE_STATUSES } from "@/lib/types";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        rewardType: "percentage",
        rewardValue: 0,
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

  const isEndedProgram = program?.status === 'Done';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEndedProgram ? "Review Program" : program ? "Edit Program" : "Add Program"}</DialogTitle>
          <DialogDescription>
            {isEndedProgram ? "Review the incentive status for this completed program." : program ? "Update the details of this program." : "Create a new program for a brand."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="col-span-3" disabled={isEndedProgram} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">Brand</Label>
            <Select value={formData.brandId} onValueChange={(value) => handleChange('brandId', value)} disabled={isEndedProgram}>
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
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)} disabled={isEndedProgram}>
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
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)} disabled={isEndedProgram}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                      disabled={isEndedProgram}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(new Date(formData.startDate), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date) => handleChange('startDate', date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">End Date</Label>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                      disabled={isEndedProgram}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(new Date(formData.endDate), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate ? new Date(formData.endDate) : undefined}
                      onSelect={(date) => handleChange('endDate', date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rewardType" className="text-right">Reward</Label>
                <Select value={formData.rewardType} onValueChange={(value) => handleChange('rewardType', value)} disabled={isEndedProgram}>
                    <SelectTrigger className="col-span-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {REWARD_TYPES.map(t => <SelectItem key={t} value={t}>{t === 'number' ? 'Rp' : '%'}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input 
                    id="rewardValue" 
                    type="number" 
                    value={formData.rewardValue} 
                    onChange={(e) => handleChange('rewardValue', parseFloat(e.target.value))} 
                    className="col-span-2"
                    disabled={isEndedProgram}
                />
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
                disabled={isEndedProgram}
              />
              <span className="w-12 text-center text-sm font-medium">{formData.achievement || 0}%</span>
            </div>
          </div>

          {isEndedProgram && (
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="incentiveStatus" className="text-right">Incentive</Label>
                <Select value={formData.incentiveStatus} onValueChange={(value) => handleChange('incentiveStatus', value as IncentiveStatus)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Set incentive status" />
                    </SelectTrigger>
                    <SelectContent>
                        {INCENTIVE_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
