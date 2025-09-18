import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Leaf, Droplets, Thermometer, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    pH: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    location: ""
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setRecommendations([
        {
          crop: "Rice",
          suitability: 92,
          expectedYield: "8.5 tons/hectare",
          profitability: "High",
          reasons: ["Optimal pH level", "Suitable rainfall", "Good soil nutrients"],
          season: "Monsoon"
        },
        {
          crop: "Wheat", 
          suitability: 78,
          expectedYield: "4.2 tons/hectare",
          profitability: "Medium",
          reasons: ["Good nitrogen content", "Moderate temperature"],
          season: "Winter"
        },
        {
          crop: "Corn",
          suitability: 65,
          expectedYield: "6.8 tons/hectare", 
          profitability: "Medium",
          reasons: ["Adequate phosphorus", "Suitable humidity"],
          season: "Summer"
        }
      ]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Crop Recommendation</h1>
            <p className="text-muted-foreground">AI-powered crop suggestions based on your soil and climate data</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="solution-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-success" />
              Soil & Climate Parameters
            </CardTitle>
            <CardDescription>
              Enter your farm's soil and environmental conditions for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Soil Nutrients */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Soil Nutrients (mg/kg)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="40-80"
                    value={formData.nitrogen}
                    onChange={(e) => updateFormData("nitrogen", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="20-50"
                    value={formData.phosphorus}
                    onChange={(e) => updateFormData("phosphorus", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (K)</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="30-70"
                    value={formData.potassium}
                    onChange={(e) => updateFormData("potassium", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Soil Properties */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                Soil Properties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pH">pH Level</Label>
                  <Input
                    id="pH"
                    type="number"
                    step="0.1"
                    placeholder="6.0-7.5"
                    value={formData.pH}
                    onChange={(e) => updateFormData("pH", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      type="text"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Climate Data */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                Climate Data
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rainfall" className="flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    Rainfall (mm/year)
                  </Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="800-1200"
                    value={formData.rainfall}
                    onChange={(e) => updateFormData("rainfall", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1" />
                    Avg Temperature (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="20-30"
                    value={formData.temperature}
                    onChange={(e) => updateFormData("temperature", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="60-80"
                  value={formData.humidity}
                  onChange={(e) => updateFormData("humidity", e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleAnalyze} 
              className="w-full btn-hover-lift" 
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Get AI Recommendations"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary animate-pulse" />
                  AI Analysis in Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing soil composition...</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Our AI is processing your data against millions of agricultural patterns...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Recommended Crops</h2>
              {recommendations.map((rec, index) => (
                <Card key={index} className="feature-card border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{rec.crop}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={rec.suitability > 85 ? "default" : "secondary"}>
                            {rec.suitability}% Suitable
                          </Badge>
                          <Badge variant={rec.profitability === "High" ? "default" : "secondary"}>
                            {rec.profitability} Profit
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{rec.suitability}%</div>
                        <Progress value={rec.suitability} className="w-20 h-2" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Expected Yield:</span>
                          <div className="text-success font-semibold">{rec.expectedYield}</div>
                        </div>
                        <div>
                          <span className="font-medium">Best Season:</span>
                          <div className="text-primary font-semibold">{rec.season}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-success" />
                          Why This Crop?
                        </h4>
                        <ul className="text-sm space-y-1">
                          {rec.reasons.map((reason: string, idx: number) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full">
                        View Detailed Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {recommendations.length === 0 && !isAnalyzing && (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Ready for AI Analysis</h3>
                <p className="text-muted-foreground text-center">
                  Enter your soil and climate data to get personalized crop recommendations powered by machine learning.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;