import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Truck, CreditCard, Shield, ArrowLeft, Store, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Address (only for delivery)
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    
    // Store pickup
    selectedStore: "",
    
    // Payment
    paymentMethod: "card",
  });

  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  const stores = [
    { id: "mumbai-1", name: "BEN Store - Bandra", address: "Shop 15, Linking Road, Bandra West, Mumbai" },
    { id: "delhi-1", name: "BEN Store - CP", address: "Block A, Connaught Place, New Delhi" },
    { id: "bangalore-1", name: "BEN Store - Koramangala", address: "80 Feet Road, Koramangala 4th Block, Bangalore" }
  ];

  const deliveryCharge = deliveryOption === "pickup" ? 0 : (totalPrice > 50000 ? 0 : 999);
  const tax = totalPrice * 0.18;
  const finalTotal = totalPrice + deliveryCharge + tax;

  const checkPincode = async (pincode: string) => {
    // Simulate pincode validation
    const validPincodes = ["110001", "400001", "560001", "600001", "700001", "500001", "411001", "380001"];
    const isValid = validPincodes.includes(pincode);
    setPincodeValid(isValid);
    
    if (isValid) {
      const deliveryDays = Math.floor(Math.random() * 3) + 2; // 2-4 days
      const delivery = new Date();
      delivery.setDate(delivery.getDate() + deliveryDays);
      setDeliveryDate(delivery.toDateString());
    } else {
      setDeliveryDate("");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "pincode" && value.length === 6) {
      checkPincode(value);
    }
  };

  const handleDeliveryOptionChange = (option: string) => {
    setDeliveryOption(option);
    if (option === "pickup") {
      // Set pickup date (usually same day or next day)
      const pickupDate = new Date();
      pickupDate.setDate(pickupDate.getDate() + 1);
      setDeliveryDate(pickupDate.toDateString());
    }
  };

  const handleStepNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleStepBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    const message = deliveryOption === "pickup" 
      ? `Your order will be ready for pickup by ${deliveryDate}`
      : `Your order will be delivered by ${deliveryDate}`;
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: message,
    });
    
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link to="/cart">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-100">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-800/60 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle>Delivery Option</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Delivery Option Selection */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                        deliveryOption === "delivery" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="delivery"
                          checked={deliveryOption === "delivery"}
                          onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                        />
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <span className="font-medium">Home Delivery</span>
                          <p className="text-sm text-gray-600">Get it delivered to your doorstep</p>
                        </div>
                      </label>
                      
                      <label className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                        deliveryOption === "pickup" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="pickup"
                          checked={deliveryOption === "pickup"}
                          onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                        />
                        <Store className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">Store Pickup</span>
                          <p className="text-sm text-gray-600">Pick up from our store - No delivery charges!</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Store Selection for Pickup */}
                  {deliveryOption === "pickup" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Store className="h-5 w-5 mr-2" />
                        Select Store
                      </h3>
                      <Select onValueChange={(value) => handleInputChange("selectedStore", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a store for pickup" />
                        </SelectTrigger>
                        <SelectContent>
                          {stores.map((store) => (
                            <SelectItem key={store.id} value={store.id}>
                              <div>
                                <div className="font-medium">{store.name}</div>
                                <div className="text-sm text-gray-600">{store.address}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.selectedStore && (
                        <Badge className="bg-green-100 text-green-800">
                          <Store className="h-3 w-3 mr-1" />
                          Ready for pickup by {deliveryDate}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Delivery Address for Home Delivery */}
                  {deliveryOption === "delivery" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Delivery Address
                      </h3>
                      
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="House No, Building, Street, Area"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="landmark">Landmark</Label>
                        <Input
                          id="landmark"
                          value={formData.landmark}
                          onChange={(e) => handleInputChange("landmark", e.target.value)}
                          placeholder="Near a landmark (Optional)"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select onValueChange={(value) => handleInputChange("state", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="mumbai">Maharashtra</SelectItem>
                              <SelectItem value="bangalore">Karnataka</SelectItem>
                              <SelectItem value="chennai">Tamil Nadu</SelectItem>
                              <SelectItem value="kolkata">West Bengal</SelectItem>
                              <SelectItem value="hyderabad">Telangana</SelectItem>
                              <SelectItem value="pune">Maharashtra</SelectItem>
                              <SelectItem value="ahmedabad">Gujarat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            placeholder="6 digits"
                            maxLength={6}
                            required
                          />
                          {pincodeValid === true && (
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              <Truck className="h-3 w-3 mr-1" />
                              Delivery available by {deliveryDate}
                            </Badge>
                          )}
                          {pincodeValid === false && (
                            <Badge variant="destructive" className="mt-2">
                              Delivery not available to this pincode
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleStepNext} 
                    className="w-full mt-6"
                    disabled={
                      !formData.firstName || 
                      !formData.lastName || 
                      !formData.email || 
                      !formData.phone || 
                      (deliveryOption === "delivery" && (!formData.address || !formData.city || !formData.state || !formData.pincode || pincodeValid !== true)) ||
                      (deliveryOption === "pickup" && !formData.selectedStore)
                    }
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-800/60 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      />
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      />
                      <div className="w-5 h-5 bg-orange-500 rounded" />
                      <span className="font-medium">UPI Payment</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      />
                      <div className="w-5 h-5 bg-green-500 rounded" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-800">Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={handleStepBack} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleStepNext} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-800/60 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      {deliveryOption === "pickup" ? "Pickup Details" : "Delivery Address"}
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                      {deliveryOption === "pickup" ? (
                        <div>
                          {stores.find(store => store.id === formData.selectedStore) && (
                            <div>
                              <p className="font-medium">{stores.find(store => store.id === formData.selectedStore)?.name}</p>
                              <p>{stores.find(store => store.id === formData.selectedStore)?.address}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p>{formData.address}</p>
                          {formData.landmark && <p>Near {formData.landmark}</p>}
                          <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                        </div>
                      )}
                      <p>{formData.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="capitalize">{formData.paymentMethod === "cod" ? "Cash on Delivery" : formData.paymentMethod.toUpperCase()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      {deliveryOption === "pickup" ? "Expected Pickup" : "Expected Delivery"}
                    </h3>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800 font-medium">{deliveryDate}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={handleStepBack} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-800/60 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{deliveryOption === "pickup" ? "Pickup" : "Delivery"}</span>
                    <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
