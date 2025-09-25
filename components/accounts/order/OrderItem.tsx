import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, FileText } from "lucide-react";

interface Order {
  id: string;
  amount: number;
  course: string;
  date: string;
  status: string;
}

interface OrderProps {
  order: Order;
}

export default function OrderItem({ order }: OrderProps) {
  return (
    <Card className="p-4 transition-shadow hover:shadow-md">
      <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-gray-900">{order.course}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{order.date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">${order.amount}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              order.status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
          <Button size="sm" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Invoice
          </Button>
        </div>
      </div>
    </Card>
  );
}
