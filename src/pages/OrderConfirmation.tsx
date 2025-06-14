import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const OrderConfirmation = () => {
  const [orderDetails] = useState({
    orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: 89999,
    paymentMethod: "UPI",
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(),
    items: [
      { name: "Samsung 65\" 4K Smart TV", price: 89999, quantity: 1 }
    ]
  });

  useEffect(() => {
    // Animate success elements
    gsap.fromTo(".success-icon", 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo(".order-card", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, stagger: 0.1 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="success-icon inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-900 via-green-800 to-green-950 rounded-full mb-4 shadow-xl border border-white/10">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-300">Thank you for your purchase. Your order has been placed successfully.</p>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card className="order-card shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 border-0">
              <CardHeader className="bg-gradient-to-r from-green-900 to-green-800 text-white">
                <CardTitle className="flex items-center text-white">
                  <Package className="h-5 w-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-bold text-lg">{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-lg text-green-600">₹{orderDetails.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="order-card shadow-lg bg-gradient-to-r from-blue-950 via-blue-900 to-gray-950 border-0">
              <CardHeader className="bg-gradient-to-r from-blue-950 to-blue-900 text-white">
                <CardTitle className="flex items-center text-white">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium">Expected Delivery</p>
                      <p className="text-sm text-gray-600">{orderDetails.deliveryDate}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="order-card shadow-lg bg-gradient-to-br from-purple-950 via-purple-900 to-gray-950 border-0">
              <CardHeader className="bg-gradient-to-r from-purple-950 to-purple-900 text-white">
                <CardTitle className="flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  Track Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-600">Your order has been placed</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-gray-600">Your order is being prepared</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-gray-500">Shipped</p>
                      <p className="text-sm text-gray-400">Your order is on the way</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-gray-500">Delivered</p>
                      <p className="text-sm text-gray-400">Your order has been delivered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 justify-center">
            <Link to="/">
              <Button variant="outline" className="order-card border-gray-800 text-gray-200 hover:bg-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link to="/account">
              <Button className="order-card bg-gradient-to-r from-blue-950 to-purple-950 hover:from-blue-900 hover:to-purple-950 text-white shadow-lg">
                View All Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
