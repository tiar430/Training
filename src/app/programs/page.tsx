import { getBrands, getPrograms } from "@/lib/data";
import { PageHeader } from "@/components/brand-management/page-header";
import { KanbanBoard } from "@/components/brand-management/kanban-board";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const brands = await getBrands();

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="p-4 md:p-8 pt-6">
        <PageHeader title="Programs">
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import CSV</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
            </div>
        </PageHeader>
      </div>
      <div className="flex-1 px-4 md:px-8 pb-4 overflow-auto">
        <KanbanBoard initialPrograms={programs} brands={brands} />
      </div>
    </div>
  );
}
