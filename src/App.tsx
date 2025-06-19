
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Offers from "./pages/Offers";
import NotFound from "./pages/NotFound";
import Televisions from "./pages/Televisions";
import WashingMachines from "./pages/WashingMachines";
import Refrigerators from "./pages/Refrigerators";
import Microwaves from "./pages/Microwaves";
import AirConditioners from "./pages/AirConditioners";
import FurnitureCategory from "./pages/FurnitureCategory";
import FindStore from "./pages/FindStore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col w-full min-h-screen bg-background text-foreground dark">
            <Header />
            <main className="flex-1 overflow-y-auto bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/find-store" element={<FindStore />} />
                <Route path="/category/televisions" element={<Televisions />} />
                <Route path="/category/washing-machines" element={<WashingMachines />} />
                <Route path="/category/refrigerators" element={<Refrigerators />} />
                <Route path="/category/microwaves" element={<Microwaves />} />
                <Route path="/category/air-conditioners" element={<AirConditioners />} />
                <Route path="/category/furniture" element={<FurnitureCategory />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<Account />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
