
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Building2, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Branch {
  id: number;
  name: string;
  location: string;
  image: string;
}

const AdminBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 1,
      name: "Kathmandu Branch",
      location: "Thamel, Kathmandu",
      image: "/images/branch1.jpg"
    },
    {
      id: 2,
      name: "Pokhara Branch", 
      location: "Lakeside, Pokhara",
      image: "/images/branch2.jpg"
    },
    {
      id: 3,
      name: "Chitwan Branch",
      location: "Bharatpur, Chitwan",
      image: "/images/branch3.jpg"
    },
    {
      id: 4,
      name: "Butwal Branch",
      location: "Traffic Chowk, Butwal",
      image: "/images/branch4.jpg"
    }
  ]);

  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, ...formData }
          : branch
      ));
      toast({
        title: "Branch Updated",
        description: "Branch information has been updated successfully.",
      });
    } else {
      // Add new branch
      const newBranch: Branch = {
        id: Date.now(),
        ...formData
      };
      setBranches([...branches, newBranch]);
      toast({
        title: "Branch Added",
        description: "New branch has been added successfully.",
      });
    }

    setIsDialogOpen(false);
    setEditingBranch(null);
    setFormData({ name: "", location: "", image: "" });
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      image: branch.image
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBranches(branches.filter(branch => branch.id !== id));
    toast({
      title: "Branch Deleted",
      description: "Branch has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingBranch(null);
    setFormData({ name: "", location: "", image: "" });
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Branch Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? "Edit Branch" : "Add New Branch"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Branch Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter branch name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter branch location"
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#006d4e] hover:bg-[#005a3f]">
                  {editingBranch ? "Update" : "Add"} Branch
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop";
                }}
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-[#006d4e]" />
                {branch.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{branch.location}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(branch)}
                  className="flex-1"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(branch.id)}
                  className="flex-1"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBranches;
