import type { Brand, Program } from '@/lib/types';
import { getBrands, getPrograms } from '@/lib/data';
import { PageHeader } from '@/components/brand-management/page-header';
import { StatCards } from '@/components/brand-management/stat-cards';
import { RewardsChart } from '@/components/brand-management/rewards-chart';

export default async function DashboardPage() {
  const programs = await getPrograms();
  const brands = await getBrands();

  const totalRewards = programs.reduce((acc, prog) => acc + (prog.achievement / 100) * 150, 0);

  const chartData = brands.map(brand => {
    const brandPrograms = programs.filter(p => p.brandId === brand.id);
    const totalBrandRewards = brandPrograms.reduce((acc, prog) => acc + (prog.achievement / 100) * 150, 0);
    return {
      name: brand.name,
      totalRewards: Math.round(totalBrandRewards),
    };
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Dashboard" />
      <div className="space-y-4">
        <StatCards 
          totalPrograms={programs.length}
          totalBrands={brands.length}
          totalRewards={totalRewards}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RewardsChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
