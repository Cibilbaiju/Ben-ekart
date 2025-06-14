
import { Tv } from "lucide-react";

const Televisions = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center mb-6">
        <Tv className="h-12 w-12 text-blue-500" />
        <h1 className="text-4xl font-bold ml-3">Televisions</h1>
      </div>
      <img
        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
        alt="Televisions"
        className="rounded-xl shadow-lg mb-8 mx-auto max-w-full"
        style={{ maxHeight: 340 }}
      />
      <p className="text-lg text-gray-300 mb-4">
        Elevate your home viewing experience with our range of smart and UHD televisions. Offering vibrant visuals, immersive sound, and the latest in entertainment tech.
      </p>
      <ul className="text-left mx-auto text-gray-400 list-disc space-y-2 max-w-lg">
        <li>4K & OLED Models</li>
        <li>Smart TV Features</li>
        <li>Multiple Size Options</li>
        <li>Energy Efficient</li>
      </ul>
    </div>
  </div>
);

export default Televisions;
