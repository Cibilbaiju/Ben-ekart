
import { Microwave } from "lucide-react";

const Microwaves = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center mb-6">
        <Microwave className="h-12 w-12 text-purple-400" />
        <h1 className="text-4xl font-bold ml-3">Microwaves</h1>
      </div>
      <img
        src="https://images.unsplash.com/photo-1506368083636-6defb67639b7?auto=format&fit=crop&w=900&q=80"
        alt="Microwaves"
        className="rounded-xl shadow-lg mb-8 mx-auto max-w-full"
        style={{ maxHeight: 340 }}
      />
      <p className="text-lg text-gray-300 mb-4">
        Enjoy quick and effortless cooking with our range of advanced microwave ovens. Designed for efficiency, versatility, and style.
      </p>
      <ul className="text-left mx-auto text-gray-400 list-disc space-y-2 max-w-lg">
        <li>Convection & Solo Models</li>
        <li>Express Cooking Programs</li>
        <li>Child Lock & Safety Features</li>
        <li>Modern Touch Controls</li>
      </ul>
    </div>
  </div>
);

export default Microwaves;
