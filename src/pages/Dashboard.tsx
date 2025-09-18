import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Camera, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  ArrowUpRight,
  Activity,
  Leaf
} from "lucide-react";

const Dashboard = () => {
  const quickActions = [
    {
      title: "Crop Recommendation",
      description: "Get AI-powered crop suggestions for your farm",
      icon: Brain,
      href: "/crop-recommendation",
      color: "bg-gradient-to-br from-primary/10 to-primary/20",
      iconColor: "text-primary"
    },
    {
      title: "Disease Detection",
      description: "Upload plant images for instant disease analysis",
      icon: Camera,
      href: "/disease-detection",
      color: "bg-gradient-to-br from-accent/10 to-accent/20",
      iconColor: "text-accent"
    },
    {
      title: "Weekly Planning",
      description: "View your personalized crop management plan",
      icon: Calendar,
      href: "/crop-planning",
      color: "bg-gradient-to-br from-success/10 to-success/20",
      iconColor: "text-success"
    },
    {
      title: "AI Assistant",
      description: "Chat with our multilingual agricultural expert",
      icon: MessageSquare,
      href: "/ai-assistant",
      color: "bg-gradient-to-br from-warning/10 to-warning/20",
      iconColor: "text-warning"
    },
    {
      title: "Market Analysis",
      description: "Check real-time prices and market trends",
      icon: TrendingUp,
      href: "/market-analysis",
      color: "bg-gradient-to-br from-earth/10 to-earth/20",
      iconColor: "text-earth"
    }
  ];

  const weatherData = [
    { icon: Thermometer, label: "Temperature", value: "28°C", color: "text-accent" },
    { icon: Droplets, label: "Humidity", value: "65%", color: "text-primary" },
    { icon: Sun, label: "UV Index", value: "High", color: "text-warning" },
    { icon: Wind, label: "Wind Speed", value: "12 km/h", color: "text-success" }
  ];

  const farmStats = [
    { label: "Total Crops", value: "12", change: "+2", trend: "up" },
    { label: "Healthy Plants", value: "95%", change: "+3%", trend: "up" },
    { label: "Yield Prediction", value: "8.2t", change: "+15%", trend: "up" },
    { label: "Next Harvest", value: "12 days", change: "-2", trend: "down" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening on your farm today.</p>
      </div>

      {/* Farm Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {farmStats.map((stat, index) => (
          <Card key={stat.label} className="feature-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-success' : 'text-accent'}`}>
                  <ArrowUpRight className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Access your most-used agricultural tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={action.title}
                    variant="ghost"
                    className="h-auto p-4 justify-start hover:shadow-medium transition-all duration-300 group"
                    asChild
                  >
                    <Link to={action.href}>
                      <div className="flex items-start space-x-4 w-full">
                        <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest agricultural insights and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Disease scan completed", time: "2 hours ago", status: "success" },
                  { action: "Weekly plan updated", time: "1 day ago", status: "info" },
                  { action: "Market price alert", time: "2 days ago", status: "warning" },
                  { action: "Crop recommendation generated", time: "3 days ago", status: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="h-5 w-5 mr-2 text-warning" />
                Weather Today
              </CardTitle>
              <CardDescription>Current conditions at your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weatherData.map((weather, index) => (
                  <div key={weather.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <weather.icon className={`h-4 w-4 ${weather.color}`} />
                      <span className="text-sm text-muted-foreground">{weather.label}</span>
                    </div>
                    <span className="font-medium text-foreground">{weather.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Farm Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-success" />
                Farm Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">92</div>
                <div className="text-sm text-muted-foreground mb-4">Excellent Health</div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-success to-success/80 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on crop health, weather conditions, and growth patterns
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Optimal Watering Time</h4>
                <p className="text-sm text-muted-foreground">
                  Water your crops early morning (6-8 AM) for best absorption and reduced evaporation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;