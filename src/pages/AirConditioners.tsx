
import { Wind } from "lucide-react";

const AirConditioners = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center mb-6">
        <Wind className="h-12 w-12 text-orange-400" />
        <h1 className="text-4xl font-bold ml-3">Air Conditioners</h1>
      </div>
      <img
        src="https://images.unsplash.com/photo-1530133532239-01a4f96c1f5a?auto=format&fit=crop&w=900&q=80"
        alt="Air Conditioners"
        className="rounded-xl shadow-lg mb-8 mx-auto max-w-full"
        style={{ maxHeight: 340 }}
      />
      <p className="text-lg text-gray-300 mb-4">
        Achieve perfect indoor comfort with our high-efficiency air conditioners. Smart cooling, energy savings, and quiet operation for every room.
      </p>
      <ul className="text-left mx-auto text-gray-400 list-disc space-y-2 max-w-lg">
        <li>Inverter & Non-Inverter Options</li>
        <li>Smart Control Features</li>
        <li>High Star Ratings</li>
        <li>Multi-Stage Filtration</li>
      </ul>
    </div>
  </div>
);

export default AirConditioners;
