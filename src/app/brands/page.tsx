import { getBrands, getPrograms } from '@/lib/data';
import { PageHeader } from '@/components/brand-management/page-header';
import { BrandsTable } from '@/components/brand-management/brands-table';

export default async function BrandsPage() {
  const brands = await getBrands();
  const programs = await getPrograms();

  const brandsWithProgramCount = brands.map((brand) => ({
    ...brand,
    programCount: programs.filter((p) => p.brandId === brand.id).length,
  }));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Brands" />
      <BrandsTable data={brandsWithProgramCount} />
    </div>
  );
}
