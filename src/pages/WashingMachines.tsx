
import { Waves } from "lucide-react";

const WashingMachines = () => (
  <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center mb-6">
        <Waves className="h-12 w-12 text-cyan-400" />
        <h1 className="text-4xl font-bold ml-3">Washing Machines</h1>
      </div>
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
        alt="Washing Machines"
        className="rounded-xl shadow-lg mb-8 mx-auto max-w-full"
        style={{ maxHeight: 340 }}
      />
      <p className="text-lg text-gray-300 mb-4">
        Discover our advanced washing machines for effortless cleaning. Built with water-saving technology, silent cycles, and stain removal features.
      </p>
      <ul className="text-left mx-auto text-gray-400 list-disc space-y-2 max-w-lg">
        <li>Front & Top Load Options</li>
        <li>Energy & Water Efficient</li>
        <li>Rapid & Silent Cycles</li>
        <li>Hygienic Wash Programs</li>
      </ul>
    </div>
  </div>
);

export default WashingMachines;
