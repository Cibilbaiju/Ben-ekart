
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { checkAdminStatus } from "@/utils/adminAuth";

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { orders, isLoading, updateOrderStatus } = useAdminOrders();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    verifyAdminAccess();
  }, [user, navigate]);

  const verifyAdminAccess = async () => {
    try {
      const hasAdminAccess = await checkAdminStatus(user?.id, toast);
      if (hasAdminAccess) {
        setIsAdmin(true);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      navigate('/dashboard');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // This will be handled by the redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <AdminHeader onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-8">
        <OrdersTable orders={orders} onUpdateOrderStatus={updateOrderStatus} />
      </div>
    </div>
  );
};

export default Admin;
