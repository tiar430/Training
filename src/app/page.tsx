import type { Brand, Program } from '@/lib/types';
import { getBrands, getPrograms } from '@/lib/data';
import { PageHeader } from '@/components/brand-management/page-header';
import { StatCards } from '@/components/brand-management/stat-cards';
import { RewardsChart } from '@/components/brand-management/rewards-chart';

export default async function DashboardPage() {
  const programs = await getPrograms();
  const brands = await getBrands();

  const calculateReward = (program: Program) => {
    if (program.rewardType === 'percentage') {
      const baseAmount = 1000000; // Example base amount
      return (program.rewardValue / 100) * baseAmount * (program.achievement / 100);
    }
    return program.rewardValue * (program.achievement / 100);
  };

  const totalRewards = programs.reduce((acc, prog) => acc + calculateReward(prog), 0);

  const chartData = brands.map(brand => {
    const brandPrograms = programs.filter(p => p.brandId === brand.id);
    const totalBrandRewards = brandPrograms.reduce((acc, prog) => acc + calculateReward(prog), 0);
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
