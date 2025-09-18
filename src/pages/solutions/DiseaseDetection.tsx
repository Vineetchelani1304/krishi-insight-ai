import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, AlertTriangle, CheckCircle, Leaf, Eye, ArrowRight } from "lucide-react";

const DiseaseDetection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: "Late Blight",
        confidence: 94,
        severity: "Moderate",
        affected_area: 35,
        crop: "Tomato",
        symptoms: [
          "Dark brown spots on leaves",
          "White fuzzy growth on leaf undersides",
          "Yellowing around spots"
        ],
        treatment: {
          immediate: [
            "Remove affected leaves immediately",
            "Apply copper-based fungicide spray",
            "Improve air circulation around plants"
          ],
          preventive: [
            "Water at soil level, not on leaves",
            "Apply preventive fungicide weekly",
            "Ensure proper plant spacing"
          ]
        },
        urgency: "High"
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg">
            <Camera className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
            <p className="text-muted-foreground">AI-powered plant disease identification and treatment recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="solution-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2 text-primary" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Take a clear photo of the affected plant leaves for accurate disease detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded plant" 
                    className="w-full h-64 object-cover rounded-lg shadow-medium"
                  />
                  <div className="flex space-x-2">
                    <Button 
                      onClick={analyzeImage}
                      className="flex-1 btn-hover-lift"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Disease"}
                      <Eye className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Upload Plant Image</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a clear, well-lit photo showing the plant disease symptoms
                  </p>
                  <label htmlFor="image-upload">
                    <Button className="cursor-pointer btn-hover-lift">
                      Choose Image
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Tips for Better Photos */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Leaf className="h-4 w-4 mr-2 text-primary" />
                  Tips for Better Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2"></div>
                    Use natural daylight for clear images
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2"></div>
                    Focus on affected leaves and symptoms
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2"></div>
                    Avoid blurry or dark photos
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2"></div>
                    Include multiple affected areas if possible
                  </li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-accent animate-pulse" />
                  AI Analysis in Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Processing image...</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Deep learning model analyzing plant symptoms and comparing with disease database...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {analysisResult && (
            <div className="space-y-4">
              {/* Disease Identification */}
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-accent">{analysisResult.disease}</CardTitle>
                      <p className="text-muted-foreground">Detected in {analysisResult.crop}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{analysisResult.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant={analysisResult.severity === "High" ? "destructive" : "secondary"}>
                        {analysisResult.severity} Severity
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={analysisResult.urgency === "High" ? "destructive" : "default"}>
                        {analysisResult.urgency} Urgency
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Affected Area: {analysisResult.affected_area}%</h4>
                    <Progress value={analysisResult.affected_area} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Symptoms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                    Identified Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-warning mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Treatment Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Leaf className="h-5 w-5 mr-2 text-success" />
                    Treatment Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-destructive mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Immediate Actions Required
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.treatment.immediate.map((action: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <ArrowRight className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Preventive Measures
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.treatment.preventive.map((measure: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      Get Detailed Treatment Plan
                    </Button>
                    <Button variant="outline">
                      Find Nearby Suppliers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!analysisResult && !isAnalyzing && (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Ready for Disease Detection</h3>
                <p className="text-muted-foreground text-center">
                  Upload a clear image of your plant to get instant disease identification and treatment recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;