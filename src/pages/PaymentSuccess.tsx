
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // In a real app, you would verify the payment with your backend
    if (sessionId) {
      // Mock order details - replace with actual API call
      setOrderDetails({
        orderId: sessionId.substring(0, 8).toUpperCase(),
        amount: "$49.99",
        product: "Premium Product",
        date: new Date().toLocaleDateString()
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {orderDetails && (
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-mono">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Amount:</span>
                <span className="text-green-400 font-semibold">{orderDetails.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Product:</span>
                <span className="text-white">{orderDetails.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date:</span>
                <span className="text-white">{orderDetails.date}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            
            <Link to="/dashboard">
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                View Orders
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            Thank you for your purchase! You will receive an email confirmation shortly.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
