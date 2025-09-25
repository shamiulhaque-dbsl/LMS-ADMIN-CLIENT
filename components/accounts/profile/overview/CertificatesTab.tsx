import CertificateCard from "./CertificateCard";

interface Certificate {
  title: string;
  course: string;
  date: string;
  url?: string;
}

export default function CertificatesTab({ certificates }: { certificates: Certificate[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">My Certificates</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {certificates.map((certificate: Certificate, index: number) => (
          <CertificateCard key={index} certificate={certificate} />
        ))}
      </div>
    </div>
  );
}
