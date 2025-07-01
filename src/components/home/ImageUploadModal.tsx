import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CarouselImage {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: CarouselImage[];
  onImageUpload: (image: CarouselImage) => void;
  onImageDelete: (imageId: string) => void;
  onImageUpdate: (image: CarouselImage) => void;
}

export function ImageUploadModal({ 
  isOpen, 
  onClose, 
  images, 
  onImageUpload, 
  onImageDelete, 
  onImageUpdate 
}: ImageUploadModalProps) {
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null)
  const [formData, setFormData] = useState({
    desktopSrc: "",
    mobileSrc: "",
    alt: ""
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.desktopSrc || !formData.mobileSrc || !formData.alt) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    const imageData: CarouselImage = {
      id: editingImage?.id || Date.now().toString(),
      desktopSrc: formData.desktopSrc,
      mobileSrc: formData.mobileSrc,
      alt: formData.alt
    }

    if (editingImage) {
      onImageUpdate(imageData)
      toast({
        title: "Success",
        description: "Image updated successfully"
      })
    } else {
      onImageUpload(imageData)
      toast({
        title: "Success",
        description: "Image added successfully"
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      desktopSrc: "",
      mobileSrc: "",
      alt: ""
    })
    setEditingImage(null)
  }

  const handleEdit = (image: CarouselImage) => {
    setEditingImage(image)
    setFormData({
      desktopSrc: image.desktopSrc,
      mobileSrc: image.mobileSrc,
      alt: image.alt
    })
  }

  const handleDelete = (imageId: string) => {
    onImageDelete(imageId)
    toast({
      title: "Success",
      description: "Image deleted successfully"
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Carousel Images</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add/Edit Form */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">
              {editingImage ? "Edit Image" : "Add New Image"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="desktopSrc">Desktop Image URL (16:9)</Label>
                <Input
                  id="desktopSrc"
                  value={formData.desktopSrc}
                  onChange={(e) => handleInputChange("desktopSrc", e.target.value)}
                  placeholder="Enter desktop image URL..."
                />
                {formData.desktopSrc && (
                  <div className="mt-2">
                    <img 
                      src={formData.desktopSrc} 
                      alt="Desktop preview" 
                      className="w-full h-24 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="mobileSrc">Mobile Image URL (9:16)</Label>
                <Input
                  id="mobileSrc"
                  value={formData.mobileSrc}
                  onChange={(e) => handleInputChange("mobileSrc", e.target.value)}
                  placeholder="Enter mobile image URL..."
                />
                {formData.mobileSrc && (
                  <div className="mt-2">
                    <img 
                      src={formData.mobileSrc} 
                      alt="Mobile preview" 
                      className="w-16 h-28 object-cover rounded border mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={formData.alt}
                onChange={(e) => handleInputChange("alt", e.target.value)}
                placeholder="Enter image description..."
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSubmit}>
                <Plus className="h-4 w-4 mr-2" />
                {editingImage ? "Update Image" : "Add Image"}
              </Button>
              {editingImage && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </div>

          {/* Existing Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Images</h3>
            {images.length === 0 ? (
              <p className="text-muted-foreground">No images added yet.</p>
            ) : (
              <div className="grid gap-4">
                {images.map((image) => (
                  <div key={image.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{image.alt}</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(image)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Desktop (16:9)</p>
                        <img 
                          src={image.desktopSrc} 
                          alt={`${image.alt} - Desktop`}
                          className="w-full h-24 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Mobile (9:16)</p>
                        <img 
                          src={image.mobileSrc} 
                          alt={`${image.alt} - Mobile`}
                          className="w-16 h-28 object-cover rounded border mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
