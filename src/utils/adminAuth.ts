
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const checkAdminStatus = async (userId: string | undefined, toast: ReturnType<typeof useToast>['toast']) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (error) throw error;

    if (!profile?.is_admin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  } catch (error: any) {
    toast({
      title: "Error",
      description: "Failed to verify admin status",
      variant: "destructive"
    });
    throw error;
  }
};
