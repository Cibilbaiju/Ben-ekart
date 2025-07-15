
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { CreditCard, Lock, Shield, Store, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentGatewayProps {
  amount?: number;
  productName?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PaymentGateway = ({ 
  amount, 
  productName, 
  onSuccess, 
  onCancel 
}: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCartStore();

  // Use cart data if no specific amount/product provided
  const finalAmount = amount || totalPrice;
  const finalProductName = productName || `Cart Items (${items.length} items)`;

  const stores = [
    { id: "pallikkara", name: "BEN Home Ambitions - Pallikkara", address: "Main Road, Pallikkara, Ernakulam" },
    { id: "mannoor", name: "BEN Home Ambitions - Mannoor", address: "NH Road, Mannoor, Ernakulam" },
    { id: "karimugal", name: "BEN Home Ambitions - Karimugal", address: "MC Road, Karimugal, Ernakulam" }
  ];

  const deliveryCharge = deliveryOption === "pickup" ? 0 : (finalAmount > 50000 ? 0 : 999);

  const handlePayment = async () => {
    if (finalAmount <= 0) {
      toast({
        title: "Error",
        description: "No items in cart or invalid amount",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Prepare payment data
      const paymentData = amount ? {
        amount: finalAmount,
        productName: finalProductName,
        currency: 'inr'
      } : {
        amount: finalAmount,
        productName: finalProductName,
        currency: 'inr',
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      console.log('Initiating payment with data:', paymentData);

      // Call Supabase edge function for payment processing
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: paymentData
      });

      if (error) {
        console.error('Payment function error:', error);
        throw error;
      }

      if (data?.url) {
        // Clear cart if processing cart items
        if (!amount) {
          clearCart();
        }
        
        // Redirect to Stripe checkout
        window.location.href = data.url;
        onSuccess?.();
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please check if payment service is configured.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Shield className="h-4 w-4" />
          256-bit SSL Encrypted
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{finalProductName}</h3>
          <p className="text-2xl font-bold text-green-400">₹{finalAmount.toLocaleString()}</p>
        </div>

        {/* Delivery Option */}
        <div className="space-y-4">
          <label className="text-white text-sm font-medium">Delivery Option</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDeliveryOption('delivery')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                deliveryOption === 'delivery'
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              <Truck className="h-4 w-4" />
              Delivery
            </button>
            <button
              onClick={() => setDeliveryOption('pickup')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                deliveryOption === 'pickup'
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              <Store className="h-4 w-4" />
              Pickup
            </button>
          </div>
          
          {deliveryOption === 'pickup' && (
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <p className="text-green-400 text-sm">🎉 No delivery charges! Pick up from any of our stores.</p>
            </div>
          )}
          
          {deliveryOption === 'delivery' && deliveryCharge === 0 && (
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <p className="text-green-400 text-sm">🎉 Free delivery on orders above ₹50,000!</p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <label className="text-white text-sm font-medium">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                paymentMethod === 'upi'
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              UPI
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              Wallet
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handlePayment}
            disabled={isProcessing || finalAmount <= 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Pay ₹{(finalAmount + deliveryCharge).toLocaleString()}
              </div>
            )}
          </Button>

          {onCancel && (
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          Your payment information is secure and encrypted. We use industry-standard security measures to protect your data.
        </div>
      </CardContent>
    </Card>
  );
};
