import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Droplets, Bug, Scissors, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const CropPlanning = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  const currentCrop = {
    name: "Rice",
    variety: "Basmati",
    plantedDate: "2024-01-15",
    expectedHarvest: "2024-05-15",
    currentStage: "Vegetative Growth",
    progress: 45
  };

  const weeklyPlans = {
    1: {
      week: "Week 1 (Mar 18-24)",
      stage: "Vegetative Growth",
      tasks: [
        {
          task: "Deep irrigation",
          priority: "High",
          time: "Early morning",
          icon: Droplets,
          status: "pending",
          description: "Apply 50mm water depth across all fields"
        },
        {
          task: "Nitrogen application",
          priority: "Medium",
          time: "After irrigation",
          icon: TrendingUp,
          status: "completed",
          description: "Apply 40kg/hectare urea fertilizer"
        },
        {
          task: "Weed monitoring",
          priority: "High",
          time: "Afternoon",
          icon: Bug,
          status: "in-progress",
          description: "Check for emerging weeds in field sections A-C"
        }
      ],
      weather: {
        temperature: "25-32°C",
        rainfall: "Expected 15mm",
        humidity: "70%",
        conditions: "Partly cloudy"
      },
      notes: "Critical growth period - monitor water levels closely"
    },
    2: {
      week: "Week 2 (Mar 25-31)",
      stage: "Tillering Phase",
      tasks: [
        {
          task: "Pest inspection",
          priority: "High",
          time: "Morning",
          icon: Bug,
          status: "pending",
          description: "Look for signs of brown planthopper and stem borer"
        },
        {
          task: "Maintain water level",
          priority: "Medium",
          time: "Daily",
          icon: Droplets,
          status: "pending",
          description: "Keep 3-5cm standing water in fields"
        },
        {
          task: "Growth assessment",
          priority: "Low",
          time: "Mid-week",
          icon: TrendingUp,
          status: "pending",
          description: "Count tillers per plant for growth tracking"
        }
      ],
      weather: {
        temperature: "24-30°C",
        rainfall: "Expected 25mm",
        humidity: "75%",
        conditions: "Light showers"
      },
      notes: "Tillering stage begins - adjust fertilizer application as needed"
    }
  };

  const currentPlan = weeklyPlans[selectedWeek as keyof typeof weeklyPlans];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "in-progress": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return Clock;
      case "pending": return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-success/10 to-success/20 rounded-lg">
            <Calendar className="h-6 w-6 text-success" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weekly Crop Planning</h1>
            <p className="text-muted-foreground">Adaptive stage-specific crop management and scheduling</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Crop Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-success" />
              Current Crop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">{currentCrop.name}</h3>
              <p className="text-muted-foreground">{currentCrop.variety} Variety</p>
              <Badge className="mt-2">{currentCrop.currentStage}</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Growth Progress</span>
                  <span>{currentCrop.progress}%</span>
                </div>
                <Progress value={currentCrop.progress} className="h-3" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Planted:</span>
                  <span className="font-medium">{currentCrop.plantedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Harvest:</span>
                  <span className="font-medium text-success">{currentCrop.expectedHarvest}</span>
                </div>
              </div>
            </div>

            {/* Week Selection */}
            <div className="space-y-2">
              <h4 className="font-semibold">Select Planning Week</h4>
              <div className="flex space-x-2">
                {[1, 2].map((week) => (
                  <Button
                    key={week}
                    variant={selectedWeek === week ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeek(week)}
                    className="flex-1"
                  >
                    Week {week}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Plan Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Week Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{currentPlan.week}</CardTitle>
                  <CardDescription>Growth Stage: {currentPlan.stage}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/5">
                  {currentPlan.tasks.filter(t => t.status === "completed").length} / {currentPlan.tasks.length} Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Temperature:</span>
                  <div className="font-medium">{currentPlan.weather.temperature}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Rainfall:</span>
                  <div className="font-medium text-primary">{currentPlan.weather.rainfall}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Humidity:</span>
                  <div className="font-medium">{currentPlan.weather.humidity}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Conditions:</span>
                  <div className="font-medium">{currentPlan.weather.conditions}</div>
                </div>
              </div>
              
              {currentPlan.notes && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-primary font-medium">📝 {currentPlan.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasks List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-success" />
                Scheduled Tasks
              </CardTitle>
              <CardDescription>
                Follow these stage-specific activities for optimal crop growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPlan.tasks.map((task, index) => {
                  const StatusIcon = getStatusIcon(task.status);
                  return (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <task.icon className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{task.task}</h4>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getPriorityColor(task.priority) as any}>
                                {task.priority}
                              </Badge>
                              <StatusIcon className={`h-4 w-4 ${getStatusColor(task.status)}`} />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {task.time}
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={task.status === "completed"}
                            >
                              {task.status === "completed" ? "Completed" : 
                               task.status === "in-progress" ? "In Progress" : "Mark Done"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Helpful tools and information for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <Bug className="h-5 w-5 text-warning" />
                    <div className="text-left">
                      <div className="font-medium">Pest Guide</div>
                      <div className="text-sm text-muted-foreground">Identification tips</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Irrigation Calculator</div>
                      <div className="text-sm text-muted-foreground">Water requirements</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <div className="text-left">
                      <div className="font-medium">Growth Tracker</div>
                      <div className="text-sm text-muted-foreground">Record progress</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropPlanning;