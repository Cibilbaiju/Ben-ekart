
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  onSignOut: () => void;
}

const AdminHeader = ({ onSignOut }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-red-800 to-orange-900 rounded-full w-12 h-12 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                Admin Panel
              </h1>
              <p className="text-gray-400">Manage customer orders and business operations</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border border-gray-800 text-gray-200 hover:bg-blue-950"
            >
              Customer View
            </Button>
            <Button
              variant="outline"
              onClick={onSignOut}
              className="flex items-center space-x-2 hover:bg-red-950 border border-gray-800 text-gray-200 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
