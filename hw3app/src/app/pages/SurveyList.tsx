import { useState } from "react";
import { useSurveys, Survey } from "../context/SurveyContext";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function SurveyList() {
  const { surveys, updateSurvey, deleteSurvey } = useSurveys();
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleEdit = (survey: Survey) => {
    setEditingSurvey({ ...survey });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this survey?")) {
      try {
        await deleteSurvey(id);
        toast.success("Survey deleted successfully!");
      } catch {
        toast.error("Unable to delete survey. Please try again.");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editingSurvey) {
      const { id, ...surveyPayload } = editingSurvey;
      try {
        await updateSurvey(id, surveyPayload);
        setIsEditDialogOpen(false);
        setEditingSurvey(null);
        toast.success("Survey updated successfully!");
      } catch {
        toast.error("Unable to update survey. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingSurvey) {
      const { name, value } = e.target;
      setEditingSurvey({ ...editingSurvey, [name]: value });
    }
  };

  const handleCheckboxChange = (interest: keyof Survey["interests"]) => {
    if (editingSurvey) {
      setEditingSurvey({
        ...editingSurvey,
        interests: {
          ...editingSurvey.interests,
          [interest]: !editingSurvey.interests[interest],
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="gmu-section-header">Survey Responses</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {surveys.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No surveys submitted yet.</p>
            <p className="text-gray-400 mt-2">Submit your first survey to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="border-2 border-[#006633] rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#006633]">{survey.username}</h3>
                    <p className="text-gray-600">{survey.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(survey)}
                      size="sm"
                      variant="outline"
                      className="border-[#006633] text-[#006633] hover:bg-[#006633] hover:text-white"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(survey.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-[#006633]">Address:</span>
                    <p className="text-gray-700">
                      {survey.street}, {survey.city}, {survey.state}, {survey.zip}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#006633]">Phone:</span>
                    <p className="text-gray-700">{survey.phone}</p>
                  </div>
                  {survey.url && (
                    <div>
                      <span className="font-semibold text-[#006633]">Website:</span>
                      <p className="text-gray-700 truncate">{survey.url}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-[#006633]">Visit Date:</span>
                    <p className="text-gray-700">{survey.date}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#006633]">Interests:</span>
                    <p className="text-gray-700">
                      {Object.entries(survey.interests)
                        .filter(([_, value]) => value)
                        .map(([key]) => key)
                        .join(", ") || "None"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#006633]">Heard From:</span>
                    <p className="text-gray-700">{survey.heardFrom || "N/A"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#006633]">HS Graduation:</span>
                    <p className="text-gray-700">
                      {survey.gradMonth} {survey.gradYear}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#006633]">Recommendation:</span>
                    <p className="text-gray-700">{survey.recommendation || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#006633]">Edit Survey</DialogTitle>
          </DialogHeader>
          {editingSurvey && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    name="username"
                    value={editingSurvey.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editingSurvey.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-street">Street</Label>
                <Input
                  id="edit-street"
                  name="street"
                  value={editingSurvey.street}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    name="city"
                    value={editingSurvey.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-state">State</Label>
                  <Input
                    id="edit-state"
                    name="state"
                    value={editingSurvey.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zip">ZIP</Label>
                  <Input
                    id="edit-zip"
                    name="zip"
                    value={editingSurvey.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    name="phone"
                    value={editingSurvey.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-url">Website URL</Label>
                  <Input
                    id="edit-url"
                    name="url"
                    value={editingSurvey.url}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-date">Date of Visit</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={editingSurvey.date}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label className="mb-2 block">Interests</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "students", label: "Students" },
                    { id: "location", label: "Location" },
                    { id: "campus", label: "Campus" },
                    { id: "atmosphere", label: "Atmosphere" },
                    { id: "dormRooms", label: "Dorm Rooms" },
                    { id: "sports", label: "Sports" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${item.id}`}
                        checked={editingSurvey.interests[item.id as keyof typeof editingSurvey.interests]}
                        onCheckedChange={() => handleCheckboxChange(item.id as keyof typeof editingSurvey.interests)}
                      />
                      <Label htmlFor={`edit-${item.id}`} className="cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">How did you hear about us?</Label>
                <RadioGroup
                  value={editingSurvey.heardFrom}
                  onValueChange={(value) => setEditingSurvey({ ...editingSurvey, heardFrom: value })}
                >
                  <div className="space-y-2">
                    {["Friends", "Television", "Internet", "Other"].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`edit-${option.toLowerCase()}`} />
                        <Label htmlFor={`edit-${option.toLowerCase()}`} className="cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-gradMonth">Graduation Month</Label>
                  <input
                    list="edit-months"
                    id="edit-gradMonth"
                    name="gradMonth"
                    value={editingSurvey.gradMonth}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                  <datalist id="edit-months">
                    {months.map((month) => (
                      <option key={month} value={month} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <Label htmlFor="edit-gradYear">Graduation Year</Label>
                  <Input
                    id="edit-gradYear"
                    name="gradYear"
                    value={editingSurvey.gradYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label>Likelihood of Recommendation</Label>
                <Select
                  value={editingSurvey.recommendation}
                  onValueChange={(value) => setEditingSurvey({ ...editingSurvey, recommendation: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very Likely">Very Likely</SelectItem>
                    <SelectItem value="Likely">Likely</SelectItem>
                    <SelectItem value="Unlikely">Unlikely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-[#006633] hover:bg-[#004d26]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
