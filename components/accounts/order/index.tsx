import { Card } from "@/components/ui/Card";
import OrderItem from "./OrderItem";

interface Order {
  id: string;
  amount: number;
  course: string;
  date: string;
  status: string;
}

interface OrderProps {
  orders: Order[];
}

export default function Order({ orders }: OrderProps) {
  return (
    <>
      {/* TODO: Separate this into a OrderHeader component */}
      <Card className="mb-8 hidden p-4 sm:block">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-1 text-gray-600">View and manage your course purchases</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Total Spent:{" "}
              <span className="font-semibold text-gray-900">
                ${orders.reduce((sum: number, order: Order) => sum + order.amount, 0).toFixed(2)}
              </span>
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </Card>
    </>
  );
}
