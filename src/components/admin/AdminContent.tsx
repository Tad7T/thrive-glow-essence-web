import React, { useState, useRef } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Plus, Trash2, Leaf, Heart, Star, Upload, ShoppingBag } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminContent = () => {
  const { contentItems, addContentItem, updateContentItem, deleteContentItem } = useAdmin();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefit' | 'ingredient' | 'testimonial' | 'product'>('benefit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const initialNewItem = {
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null as File | null,
    type: activeTab,
  };

  const [newItem, setNewItem] = useState(initialNewItem);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const filteredContent = contentItems.filter(item => item.type === activeTab);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        if (isEdit) {
          setEditingItem(prev => ({ ...prev, imageFile: file }));
          setEditImagePreview(reader.result as string);
        } else {
          setNewItem(prev => ({ ...prev, imageFile: file }));
          setImagePreview(reader.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await addContentItem({
        ...newItem,
        type: activeTab,
      });

      setNewItem(initialNewItem);
      setImagePreview(null);
      setIsDialogOpen(false);

      toast({
        title: "Item Added",
        description: `New ${activeTab} item has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem.title || !editingItem.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateContentItem(editingItem.id, {
        title: editingItem.title,
        description: editingItem.description,
        imageFile: editingItem.imageFile,
      });

      setEditingItem(null);
      setEditImagePreview(null);

      toast({
        title: "Item Updated",
        description: `The ${activeTab} item has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteContentItem(id);

    toast({
      title: "Item Deleted",
      description: `The ${activeTab} item has been deleted successfully.`,
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'benefit' | 'ingredient' | 'testimonial' | 'product');
    setNewItem({
      ...initialNewItem,
      type: tab as 'benefit' | 'ingredient' | 'testimonial' | 'product',
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'benefit':
        return <Heart className="w-4 h-4" />;
      case 'ingredient':
        return <Leaf className="w-4 h-4" />;
      case 'testimonial':
        return <Star className="w-4 h-4" />;
      case 'product':
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderAddItemDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-thrive-olive hover:bg-thrive-olive-light text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</DialogTitle>
          <DialogDescription>
            Create a new content item to display on your website.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item-type" className="text-right">
              Type
            </Label>
            <Select
              value={newItem.type}
              onValueChange={(value) => setNewItem({...newItem, type: value as any})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="benefit">Benefit</SelectItem>
                <SelectItem value="ingredient">Ingredient</SelectItem>
                <SelectItem value="testimonial">Testimonial</SelectItem>
                <SelectItem value="product">Product</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item-title" className="text-right">
              Title
            </Label>
            <Input
              id="item-title"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="item-image" className="text-right pt-2">
              Image
            </Label>
            <div className="col-span-3">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                className="hidden"
              />
              <div className="flex flex-col gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 w-full"
                >
                  <Upload size={16} /> Upload Image
                </Button>
                {imagePreview && (
                  <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border border-border">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => {
                        setImagePreview(null);
                        setNewItem(prev => ({...prev, imageFile: null}));
                      }}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="item-description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="item-description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              className="col-span-3"
              rows={5}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            setIsDialogOpen(false);
            setImagePreview(null);
            setNewItem(initialNewItem);
          }}>
            Cancel
          </Button>
          <Button onClick={handleAddItem} className="bg-thrive-olive hover:bg-thrive-olive-light text-white">
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-thrive-brown">Manage Content</h1>
        {renderAddItemDialog()}
      </div>
      
      <Tabs defaultValue="benefit" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="benefit" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>Benefits</span>
          </TabsTrigger>
          <TabsTrigger value="ingredient" className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            <span>Ingredients</span>
          </TabsTrigger>
          <TabsTrigger value="testimonial" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Testimonials</span>
          </TabsTrigger>
          <TabsTrigger value="product" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Products</span>
          </TabsTrigger>
        </TabsList>
        
        {['benefit', 'ingredient', 'testimonial', 'product'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {filteredContent.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                <div className="bg-muted-foreground/20 p-3 rounded-full mb-4">
                  {getIconForType(type)}
                </div>
                <h3 className="text-lg font-medium mb-1">No {type}s added yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first {type} item to display on your website.
                </p>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-thrive-olive hover:bg-thrive-olive-light text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex justify-between items-start">
                        <span>{item.title}</span>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => {
                              setEditingItem(item);
                              setEditImagePreview(item.imageUrl || null);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this {item.type} item.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-500 hover:bg-red-700"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {item.imageUrl && (
                        <div className="mb-3 rounded-md overflow-hidden h-40 bg-muted">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => {
          if (!open) {
            setEditingItem(null);
            setEditImagePreview(null);
          }
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit {editingItem.type.charAt(0).toUpperCase() + editingItem.type.slice(1)}</DialogTitle>
              <DialogDescription>
                Make changes to this content item.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-image" className="text-right pt-2">
                  Image
                </Label>
                <div className="col-span-3">
                  <input 
                    type="file" 
                    ref={editFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, true)}
                    className="hidden"
                  />
                  <div className="flex flex-col gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => editFileInputRef.current?.click()}
                      className="flex items-center gap-2 w-full"
                    >
                      <Upload size={16} /> Change Image
                    </Button>
                    {editImagePreview && (
                      <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border border-border">
                        <img 
                          src={editImagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditingItem(null);
                setEditImagePreview(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleUpdateItem} className="bg-thrive-olive hover:bg-thrive-olive-light text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminContent;
