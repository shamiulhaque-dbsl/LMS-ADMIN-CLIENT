import { SectionHead } from "./SectionHead";
import DotLmsLogo from "@/components/Logo";

interface InfoSectionProps {
  pageInfo: {
    title: string;
    subTitle: string;
    moto: string;
  };
}

export function InfoSection({ pageInfo }: InfoSectionProps) {
  return (
    <section className="hidden flex-col items-center justify-center space-y-8 p-8 text-gray-600 sm:flex md:w-1/2 lg:w-1/2 xl:w-2/5">
      <DotLmsLogo size="large" />
      <SectionHead title={pageInfo.title} subTitle={pageInfo.subTitle} moto={pageInfo.moto} />
    </section>
  );
}
