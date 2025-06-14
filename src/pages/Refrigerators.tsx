
import { Refrigerator } from "lucide-react";

const Refrigerators = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center mb-6">
        <Refrigerator className="h-12 w-12 text-green-400" />
        <h1 className="text-4xl font-bold ml-3">Refrigerators</h1>
      </div>
      <img
        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80"
        alt="Refrigerators"
        className="rounded-xl shadow-lg mb-8 mx-auto max-w-full"
        style={{ maxHeight: 340 }}
      />
      <p className="text-lg text-gray-300 mb-4">
        Explore refrigerators designed to keep your food fresh and your kitchen stylish. Choose from a range of sizes, finishes, and smart cooling options.
      </p>
      <ul className="text-left mx-auto text-gray-400 list-disc space-y-2 max-w-lg">
        <li>Double & Single Door Models</li>
        <li>Inverter & Smart Cooling</li>
        <li>Spacious, Flexible Storage</li>
        <li>Modern Designs</li>
      </ul>
    </div>
  </div>
);

export default Refrigerators;
