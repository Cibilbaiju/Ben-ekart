
import { CreditCard, Percent, Gift, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const bankOffers = [
  {
    id: 1,
    bank: "HDFC Bank",
    offer: "10% Instant Discount",
    description: "Up to ₹3,000 off on Credit & Debit Cards",
    minAmount: "₹15,000",
    code: "HDFC10",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: 2,
    bank: "SBI Bank",
    offer: "15% Cashback",
    description: "Maximum cashback ₹2,500 on SBI Cards",
    minAmount: "₹10,000",
    code: "SBI15",
    color: "from-green-600 to-green-800"
  },
  {
    id: 3,
    bank: "ICICI Bank",
    offer: "12% Off",
    description: "Instant discount on ICICI Credit Cards",
    minAmount: "₹12,000",
    code: "ICICI12",
    color: "from-orange-600 to-orange-800"
  },
  {
    id: 4,
    bank: "Axis Bank",
    offer: "8% Discount",
    description: "No cost EMI + 8% off on Axis Cards",
    minAmount: "₹8,000",
    code: "AXIS8",
    color: "from-purple-600 to-purple-800"
  }
];

export const BankOffers = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Percent className="h-4 w-4" />
            Bank Offers
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Exclusive Bank Offers</h2>
          <p className="text-gray-400 text-lg">Save more with our special bank partnerships</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bankOffers.map((offer) => (
            <Card key={offer.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${offer.color}`}>
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs font-medium">Exclusive</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{offer.bank}</h3>
                    <p className={`text-xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}>
                      {offer.offer}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">{offer.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        Min: {offer.minAmount}
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        Code: {offer.code}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className={`w-full bg-gradient-to-r ${offer.color} text-white py-2 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group-hover:scale-105 transform duration-200`}>
                      <Gift className="h-4 w-4" />
                      Apply Offer
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
