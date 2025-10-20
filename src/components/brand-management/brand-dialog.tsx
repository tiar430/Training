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
import type { Brand } from "@/lib/types";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

type BrandDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  brand: Brand | null;
};

export function BrandDialog({ isOpen, setIsOpen, brand }: BrandDialogProps) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setLogo(brand.logo);
    } else {
      setName("");
      setLogo("");
    }
  }, [brand, isOpen]);

  const handleSubmit = () => {
    // In a real app, you'd handle form submission to an API.
    const brandData = { name, logo };
    if (brand) {
      console.log("Updating brand:", brand.id, brandData);
    } else {
      console.log("Adding new brand:", brandData);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{brand ? "Edit Brand" : "Add Brand"}</DialogTitle>
          <DialogDescription>
            {brand ? "Update the details of this brand." : "Create a new brand to manage programs."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Logo
            </Label>
            <Select value={logo} onValueChange={setLogo}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a logo" />
              </SelectTrigger>
              <SelectContent>
                {PlaceHolderImages.map((img) => (
                  <SelectItem key={img.id} value={img.id}>
                    <div className="flex items-center gap-2">
                      <Image src={img.imageUrl} alt={img.description} width={24} height={24} className="rounded-sm" data-ai-hint={img.imageHint} />
                      <span>{img.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
