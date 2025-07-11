
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Star, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  image: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "राम बहादुर श्रेष्ठ",
      rating: 5,
      review: "उत्कृष्ट सेवा! तिनीहरूले मलाई मेरो सपनाको घर फेला पार्न मद्दत गरे। धेरै पेशेवर र भरपर्दो।",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "सुनिता गुरुङ",
      rating: 5,
      review: "अचम्मको अनुभव! उनीहरूको टोली धेरै सहयोगी र जानकार थियो। मैले मेरो संपत्ति छिट्टै बेच्न सक्नुभयो।",
      image: "https://images.unsplash.com/photo-1494790108755-2616b4cf9c85?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "अमित पौडेल",
      rating: 4,
      review: "राम्रो सेवा र उचित मूल्य। म सन्तुष्ट छु र अरूलाई सिफारिस गर्छु।",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    review: "",
    image: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReview) {
      // Update existing review
      setReviews(reviews.map(review => 
        review.id === editingReview.id 
          ? { ...review, ...formData }
          : review
      ));
      toast({
        title: "Review Updated",
        description: "Client review has been updated successfully.",
      });
    } else {
      // Add new review
      const newReview: Review = {
        id: Date.now(),
        ...formData
      };
      setReviews([...reviews, newReview]);
      toast({
        title: "Review Added",
        description: "New client review has been added successfully.",
      });
    }

    setIsDialogOpen(false);
    setEditingReview(null);
    setFormData({ name: "", rating: 5, review: "", image: "" });
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      rating: review.rating,
      review: review.review,
      image: review.image
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Review Deleted",
      description: "Client review has been deleted successfully.",
    });
  };

  const handleAddNew = () => {
    setEditingReview(null);
    setFormData({ name: "", rating: 5, review: "", image: "" });
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Client Reviews Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingReview ? "Edit Client Review" : "Add New Client Review"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <Label htmlFor="review">Review Text</Label>
                <Textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  placeholder="Enter client review"
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Client Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter client image URL"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#006d4e] hover:bg-[#005a3f]">
                  {editingReview ? "Update" : "Add"} Review
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"{review.review}"</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(review)}
                  className="flex-1"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(review.id)}
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

export default AdminReviews;
