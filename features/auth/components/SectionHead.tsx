export interface SectionHeadProps {
  title: string;
  subTitle: string;
  moto: string;
}
export const SectionHead = ({ title, subTitle, moto }: SectionHeadProps) => (
  <>
    <h1 className="max-w-3xl text-center text-4xl font-extrabold">{title}</h1>
    <p className="max-w-lg text-center text-xl leading-normal">{subTitle}</p>
    <p className="max-w-lg text-center text-base text-gray-500">{moto}</p>
  </>
);
