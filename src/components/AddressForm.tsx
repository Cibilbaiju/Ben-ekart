import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";

interface Address {
  id?: string;
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
  onAddressSelect?: (address: Address) => void;
  showSelection?: boolean;
}

export const AddressForm = ({ onAddressSelect, showSelection = false }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      landmark: 'Near Central Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: '2',
      type: 'office',
      name: 'John Doe',
      address: '456 Business Center, Floor 8',
      landmark: 'Opposite Metro Station',
      city: 'Mumbai',
      state: 'Maharashtra', 
      pincode: '400002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePincode(formData.pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive",
      });
      return;
    }

    const newAddress: Address = {
      ...formData,
      id: isEditing || Date.now().toString(),
      landmark: formData.landmark || undefined
    };

    if (isEditing) {
      setSavedAddresses(prev => prev.map(addr => 
        addr.id === isEditing ? newAddress : addr
      ));
      setIsEditing(null);
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully",
      });
    } else {
      setSavedAddresses(prev => [...prev, newAddress]);
      toast({
        title: "Address Added",
        description: "Your new address has been saved successfully",
      });
    }

    setFormData({
      type: 'home',
      name: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      isDefault: false
    });
  };

  const handleEdit = (address: Address) => {
    setFormData({
      type: address.type,
      name: address.name,
      address: address.address,
      landmark: address.landmark || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setIsEditing(address.id || null);
  };

  const handleDelete = (addressId: string) => {
    setSavedAddresses(prev => prev.filter(addr => addr.id !== addressId));
    toast({
      title: "Address Deleted",
      description: "Address has been removed successfully",
    });
  };

  const handleSelect = (address: Address) => {
    setSelectedAddress(address);
    if (onAddressSelect) {
      onAddressSelect(address);
    }
    toast({
      title: "Address Selected",
      description: `Selected ${address.type} address for delivery`,
    });
  };

  return (
    <div className="space-y-6">
      {showSelection && savedAddresses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Saved Addresses
          </h3>
          <div className="grid gap-3">
            {savedAddresses.map((address) => (
              <Card 
                key={address.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAddress?.id === address.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelect(address)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="capitalize font-medium">{address.type}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      {address.landmark && (
                        <p className="text-sm text-gray-500">Landmark: {address.landmark}</p>
                      )}
                      <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(address);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(address.id!);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Address Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="House/Flat/Office No., Building, Street"
                required
              />
            </div>

            <div>
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                value={formData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
                placeholder="Nearby landmark"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="6-digit pincode"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) => handleInputChange('isDefault', checked as boolean)}
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>

            <Button type="submit" className="w-full">
              {isEditing ? 'Update Address' : 'Save Address'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
