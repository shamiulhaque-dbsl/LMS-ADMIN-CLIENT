import { Icon } from "../Icons";

export default function PromoCard({
  icon: Icon,
  title,
  description,
  highlight,
}: {
  icon: Icon;
  title: string;
  description: string;
  highlight: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${highlight} mb-4`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
