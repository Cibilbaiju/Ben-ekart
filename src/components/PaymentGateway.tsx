
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PaymentGatewayProps {
  amount: number;
  productName: string;
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
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Call Supabase edge function for payment processing
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: amount * 100, // Convert to cents
          productName,
          paymentMethod,
          currency: 'usd'
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe checkout
        window.open(data.url, '_blank');
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
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
          <h3 className="text-lg font-semibold text-white">{productName}</h3>
          <p className="text-2xl font-bold text-green-400">${amount.toFixed(2)}</p>
        </div>

        <div className="space-y-4">
          <Label className="text-white">Payment Method</Label>
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
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Pay ${amount.toFixed(2)}
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
