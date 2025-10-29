"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import type { Program, Brand } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { format } from "date-fns";

type ProgramCardProps = {
  program: Program;
  brand?: Brand;
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
};

export function ProgramCard({ program, brand, onEdit, onDelete }: ProgramCardProps) {
  const logo = PlaceHolderImages.find((img) => img.id === brand?.logo);
  
  const calculateReward = () => {
    if (program.rewardType === 'percentage') {
      // Assuming percentage is of a base amount, e.g., 1,000,000
      const baseAmount = 1000000;
      return (program.rewardValue / 100) * baseAmount * (program.achievement / 100);
    }
    return program.rewardValue * (program.achievement / 100);
  };
  const reward = Math.round(calculateReward());

  const isEndedProgram = program.status === 'Done';

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
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {isEndedProgram ? (
                        <DropdownMenuItem onClick={() => onEdit(program)}>
                            <Eye className="mr-2 h-4 w-4" /> Review
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => onEdit(program)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDelete(program.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
            <Badge variant="secondary">{program.type}</Badge>
            {program.incentiveStatus && (
                <Badge variant={program.incentiveStatus === 'Paid' ? 'default' : 'outline'}>
                    {program.incentiveStatus}
                </Badge>
            )}
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(program.startDate), "d MMM yyyy")} - {format(new Date(program.endDate), "d MMM yyyy")}</span>
        </div>

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
            <span className="font-semibold">Rp{reward.toLocaleString('id-ID')}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
