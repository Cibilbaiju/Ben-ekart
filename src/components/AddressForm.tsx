
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";

interface Address {
  id: string;
  type: string;
  name: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface AddressFormProps {
  onSave?: (address: Address) => void;
  onCancel?: () => void;
  editAddress?: Address | null;
}

export const AddressForm = ({ onSave, onCancel, editAddress }: AddressFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: editAddress?.type || "home",
    name: editAddress?.name || "",
    address: editAddress?.address || "",
    landmark: editAddress?.landmark || "",
    city: editAddress?.city || "",
    state: editAddress?.state || "",
    pincode: editAddress?.pincode || "",
    phone: editAddress?.phone || "",
    isDefault: editAddress?.isDefault || false,
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      landmark: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
      isDefault: true,
    },
    {
      id: "2",
      type: "office",
      name: "John Doe",
      address: "456 Business Park, Floor 5",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      phone: "+91 9876543210",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(!!editAddress);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const newAddress: Address = {
      id: editAddress?.id || Date.now().toString(),
      ...formData,
    };

    if (onSave) {
      onSave(newAddress);
    } else {
      // Update local state
      if (editAddress) {
        setSavedAddresses(prev => prev.map(addr => 
          addr.id === editAddress.id ? newAddress : addr
        ));
      } else {
        setSavedAddresses(prev => [...prev, newAddress]);
      }
      
      toast({
        title: "Address Saved",
        description: "Your address has been saved successfully.",
      });
    }
    
    setShowForm(false);
    setFormData({
      type: "home",
      name: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
  };

  const handleDelete = (id: string) => {
    setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({
      title: "Address Deleted",
      description: "Address has been removed successfully.",
    });
  };

  const setAsDefault = (id: string) => {
    setSavedAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast({
      title: "Default Address Updated",
      description: "This address is now your default delivery address.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      {!editAddress && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Saved Addresses</h3>
            <Button onClick={() => setShowForm(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </div>
          
          <div className="grid gap-4">
            {savedAddresses.map((address) => (
              <Card key={address.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={address.type === "home" ? "default" : "secondary"}>
                          {address.type}
                        </Badge>
                        {address.isDefault && (
                          <Badge className="bg-green-100 text-green-800">Default</Badge>
                        )}
                      </div>
                      
                      <h4 className="font-semibold">{address.name}</h4>
                      <p className="text-gray-600 mt-1">{address.address}</p>
                      {address.landmark && (
                        <p className="text-gray-500 text-sm">Near {address.landmark}</p>
                      )}
                      <p className="text-gray-600">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setFormData(address);
                        setShowForm(true);
                      }}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(address.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => setAsDefault(address.id)}>
                          Set Default
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Address Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {editAddress ? "Edit Address" : "Add New Address"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="addressType">Address Type</Label>
              <Select onValueChange={(value) => handleInputChange("type", value)} value={formData.type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="House No, Building, Street, Area"
                required
              />
            </div>

            <div>
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                value={formData.landmark}
                onChange={(e) => handleInputChange("landmark", e.target.value)}
                placeholder="Near a landmark (Optional)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => handleInputChange("state", value)} value={formData.state}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Maharashtra</SelectItem>
                    <SelectItem value="bangalore">Karnataka</SelectItem>
                    <SelectItem value="chennai">Tamil Nadu</SelectItem>
                    <SelectItem value="kolkata">West Bengal</SelectItem>
                    <SelectItem value="hyderabad">Telangana</SelectItem>
                    <SelectItem value="pune">Maharashtra</SelectItem>
                    <SelectItem value="ahmedabad">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="6 digits"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => handleInputChange("isDefault", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => {
                setShowForm(false);
                if (onCancel) onCancel();
              }} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                Save Address
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
