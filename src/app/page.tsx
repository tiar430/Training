import type { Brand, Program } from '@/lib/types';
import { getBrands, getPrograms } from '@/lib/data';
import { PageHeader } from '@/components/brand-management/page-header';
import { StatCards } from '@/components/brand-management/stat-cards';
import { RewardsChart } from '@/components/brand-management/rewards-chart';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYuEICRnhaPyq1kD6XrOpsZsCSnFzPMZQ",
  authDomain: "studio-6882943425-a7322.firebaseapp.com",
  databaseURL: "https://studio-6882943425-a7322-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studio-6882943425-a7322",
  storageBucket: "studio-6882943425-a7322.firebasestorage.app",
  messagingSenderId: "865979764635",
  appId: "1:865979764635:web:0a0aeb31aa90a462429b3e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
