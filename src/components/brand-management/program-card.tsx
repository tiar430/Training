"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Program, Brand } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type ProgramCardProps = {
  program: Program;
  brand?: Brand;
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
};

export function ProgramCard({ program, brand, onEdit, onDelete }: ProgramCardProps) {
  const logo = PlaceHolderImages.find((img) => img.id === brand?.logo);
  const reward = Math.round(program.achievement * 1.5);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg">{program.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    {logo && (
                        <Image
                            src={logo.imageUrl}
                            width={20}
                            height={20}
                            alt={brand?.name || "brand logo"}
                            className="rounded-full"
                            data-ai-hint={logo.imageHint}
                        />
                    )}
                    <span>{brand?.name}</span>
                </CardDescription>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(program)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(program.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge variant="secondary">{program.type}</Badge>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Achievement</span>
            <span className="text-sm font-medium">{program.achievement}%</span>
          </div>
          <Progress value={program.achievement} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
            <span className="text-muted-foreground">Calculated Reward: </span>
            <span className="font-semibold">Rp{reward}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
