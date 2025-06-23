
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Package } from "lucide-react";

interface OrderWithDetails {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  order_date: string;
  customer_id: string;
  profiles: {
    first_name: string;
    last_name: string;
    phone: string;
  } | null;
  products: {
    name: string;
    description: string;
    price: number;
  } | null;
}

interface OrdersTableProps {
  orders: OrderWithDetails[];
  onUpdateOrderStatus: (orderId: string, newStatus: string) => void;
}

const OrdersTable = ({ orders, onUpdateOrderStatus }: OrdersTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
        <CardTitle className="text-gray-100 flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>All Customer Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Order ID</TableHead>
                <TableHead className="text-gray-300">Customer</TableHead>
                <TableHead className="text-gray-300">Product</TableHead>
                <TableHead className="text-gray-300">Quantity</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-gray-700">
                  <TableCell className="text-gray-200 font-mono text-xs">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-gray-200">
                    <div>
                      <p className="font-medium">
                        {order.profiles?.first_name || 'N/A'} {order.profiles?.last_name || ''}
                      </p>
                      <p className="text-xs text-gray-400">{order.profiles?.phone || 'No phone'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-200">
                    <div>
                      <p className="font-medium">{order.products?.name || 'Unknown Product'}</p>
                      <p className="text-xs text-gray-400">${order.products?.price || 0}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-200">{order.quantity}</TableCell>
                  <TableCell className="text-gray-200 font-semibold">
                    ${order.total_amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-200 text-sm">
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => onUpdateOrderStatus(order.id, 'accepted')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onUpdateOrderStatus(order.id, 'rejected')}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      {order.status === 'accepted' && (
                        <Button
                          size="sm"
                          onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
