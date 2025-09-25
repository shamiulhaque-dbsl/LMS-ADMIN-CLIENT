import { Card } from "@/components/ui/Card";
import { Award, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Certificate {
  title: string;
  course: string;
  date: string;
  url?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="p-4 transition-shadow hover:shadow-md">
      <div className="flex flex-col items-start justify-between gap-6 xl:flex-row">
        <div className="flex-1">
          <div className="mb-2 flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-500" />
            <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
              {certificate.title}
            </h3>
          </div>
          <p className="mb-2 text-sm text-gray-600">{certificate.course}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Issued on {certificate.date}</span>
          </div>
        </div>
        <div className="flex space-x-2 xl:ml-4">
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
