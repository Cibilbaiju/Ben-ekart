
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AddressForm } from "@/components/AddressForm";
import { User, Package, MapPin, Settings, LogOut, Eye, EyeOff } from "lucide-react";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 154900,
      items: ["Samsung 65\" 4K Smart TV", "Wall Mount Kit"],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 64900,
      items: ["LG Front Load Washing Machine"],
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 29900,
      items: ["Panasonic Inverter Microwave"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <p className="text-gray-600">
                {isLogin 
                  ? "Sign in to your account to continue" 
                  : "Join HomeHaven for exclusive offers and faster checkout"
                }
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="border-gray-200 focus:border-blue-500" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="border-gray-200 focus:border-blue-500" />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="border-gray-200 focus:border-blue-500" />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      className="border-gray-200 focus:border-blue-500 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => setIsLoggedIn(true)}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="p-0 ml-1 text-blue-600 hover:text-purple-600"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Account
              </h1>
              <p className="text-gray-600">Welcome back, John Doe!</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="orders" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              <MapPin className="h-4 w-4" />
              <span>Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle>Order History</CardTitle>
                <p className="text-gray-600">View and track your recent orders</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="text-lg font-semibold mt-1 text-blue-600">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-600">• {item}</p>
                        ))}
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">View Details</Button>
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm" className="hover:bg-green-50">Reorder</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle>Profile Information</CardTitle>
                <p className="text-gray-600">Update your personal information</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profileFirstName">First Name</Label>
                      <Input id="profileFirstName" defaultValue="John" className="border-gray-200 focus:border-blue-500" />
                    </div>
                    <div>
                      <Label htmlFor="profileLastName">Last Name</Label>
                      <Input id="profileLastName" defaultValue="Doe" className="border-gray-200 focus:border-blue-500" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" type="email" defaultValue="john@example.com" className="border-gray-200 focus:border-blue-500" />
                  </div>
                  
                  <div>
                    <Label htmlFor="profilePhone">Phone Number</Label>
                    <Input id="profilePhone" type="tel" defaultValue="+91 9876543210" className="border-gray-200 focus:border-blue-500" />
                  </div>
                  
                  <div>
                    <Label htmlFor="profileBirthday">Date of Birth</Label>
                    <Input id="profileBirthday" type="date" defaultValue="1990-01-15" className="border-gray-200 focus:border-blue-500" />
                  </div>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle>Saved Addresses</CardTitle>
                <p className="text-gray-600">Manage your shipping and billing addresses</p>
              </CardHeader>
              <CardContent>
                <AddressForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                  <CardTitle>Account Settings</CardTitle>
                  <p className="text-gray-600">Manage your account preferences</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">Order updates and shipping notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">Special offers and promotions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">Product recommendations</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">Allow personalized recommendations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">Share data with partners for better offers</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="border-gray-200 focus:border-blue-500" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="border-gray-200 focus:border-blue-500" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="border-gray-200 focus:border-blue-500" />
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
