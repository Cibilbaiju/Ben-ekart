
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAdminSales } from "@/hooks/useAdminSales";
import { TrendingUp, Package, CheckCircle, Clock, Truck, Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const SalesReport = () => {
  const { salesData, isLoading, fetchSalesData } = useAdminSales();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const dateString = date.toISOString().split('T')[0];
      fetchSalesData(dateString);
      setIsCalendarOpen(false);
    }
  };

  const handleRefresh = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    fetchSalesData(dateString);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-gray-400 text-center">Loading sales data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-100 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Daily Sales Report</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-gray-200 border-gray-600 hover:bg-gray-700">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(selectedDate, "MMM dd, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="text-gray-200 border-gray-600 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Sales</p>
                <p className="text-2xl font-bold">₹{salesData?.total_sales?.toLocaleString() || '0'}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Orders</p>
                <p className="text-2xl font-bold">{salesData?.total_orders || 0}</p>
              </div>
              <Package className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">{salesData?.pending_orders || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">In Transit</p>
                <p className="text-2xl font-bold">{salesData?.in_transit_orders || 0}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Delivered</p>
                <p className="text-2xl font-bold">{salesData?.delivered_orders || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-gray-200 font-semibold mb-3">Quick Stats</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              Today: {format(selectedDate, "MMMM dd, yyyy")}
            </Badge>
            {salesData?.total_sales && salesData.total_sales > 0 && (
              <Badge className="bg-green-100 text-green-800">
                Avg Order: ₹{Math.round(salesData.total_sales / salesData.total_orders).toLocaleString()}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesReport;
