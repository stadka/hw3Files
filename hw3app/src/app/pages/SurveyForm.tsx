import { useState } from "react";
import { useNavigate } from "react-router";
import { useSurveys } from "../context/SurveyContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function SurveyForm() {
  const navigate = useNavigate();
  const { addSurvey } = useSurveys();

  const [formData, setFormData] = useState({
    username: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    url: "",
    date: "",
    interests: {
      students: false,
      location: false,
      campus: false,
      atmosphere: false,
      dormRooms: false,
      sports: false,
    },
    heardFrom: "",
    gradMonth: "",
    gradYear: "",
    recommendation: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest: keyof typeof formData.interests) => {
    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addSurvey(formData);
      toast.success("Survey submitted successfully!");
      navigate("/surveys");
    } catch {
      toast.error("Unable to submit survey. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="gmu-section-header">Campus Survey</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username" className="required">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="required">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              Address
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="street" className="required">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="required">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="required">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zip" className="required">ZIP Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    type="text"
                    pattern="[0-9]{5}"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              Additional Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="required">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="date" className="required">Date of Visit</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              What interested you most about the campus?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    id={item.id}
                    checked={formData.interests[item.id as keyof typeof formData.interests]}
                    onCheckedChange={() => handleCheckboxChange(item.id as keyof typeof formData.interests)}
                  />
                  <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              How did you become interested in the university?
            </h3>
            <RadioGroup value={formData.heardFrom} onValueChange={(value) => setFormData(prev => ({ ...prev, heardFrom: value }))}>
              <div className="space-y-3">
                {["Friends", "Television", "Internet", "Other"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option.toLowerCase()} />
                    <Label htmlFor={option.toLowerCase()} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              High School Graduation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="gradMonth">Month</Label>
                <input
                  list="months"
                  id="gradMonth"
                  name="gradMonth"
                  value={formData.gradMonth}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                />
                <datalist id="months">
                  {months.map((month) => (
                    <option key={month} value={month} />
                  ))}
                </datalist>
              </div>
              <div>
                <Label htmlFor="gradYear">Year</Label>
                <Input
                  id="gradYear"
                  name="gradYear"
                  type="text"
                  pattern="[0-9]{4}"
                  placeholder="YYYY"
                  value={formData.gradYear}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <h3 className="text-xl font-bold text-[#006633] mb-4 pb-2 border-b-2 border-[#FFCC33]">
              Likelihood of Recommending This School
            </h3>
            <Select value={formData.recommendation} onValueChange={(value) => setFormData(prev => ({ ...prev, recommendation: value }))}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select likelihood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Very Likely">Very Likely</SelectItem>
                <SelectItem value="Likely">Likely</SelectItem>
                <SelectItem value="Unlikely">Unlikely</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#006633] hover:bg-[#004d26]">
              Submit Survey
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
