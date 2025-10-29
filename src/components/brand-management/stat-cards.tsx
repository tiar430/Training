import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, KanbanSquare, Trophy } from "lucide-react";

type StatCardsProps = {
  totalPrograms: number;
  totalBrands: number;
  totalRewards: number;
};

export function StatCards({ totalPrograms, totalBrands, totalRewards }: StatCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBrands}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
          <KanbanSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPrograms}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp{Math.round(totalRewards).toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
}
