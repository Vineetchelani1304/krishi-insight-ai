import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Bell, ArrowUpRight, BarChart3, MapPin } from "lucide-react";

const MarketAnalysis = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedRegion, setSelectedRegion] = useState("punjab");

  const marketData = {
    rice: {
      currentPrice: "₹2,450",
      change: "+5.2%",
      trend: "up",
      volume: "1,245 tons",
      high52Week: "₹2,680",
      low52Week: "₹1,950",
      forecast: "+8% (next month)",
      demandLevel: "High"
    },
    wheat: {
      currentPrice: "₹2,150",
      change: "-2.1%", 
      trend: "down",
      volume: "2,180 tons",
      high52Week: "₹2,400",
      low52Week: "₹1,850",
      forecast: "+3% (next month)",
      demandLevel: "Medium"
    },
    corn: {
      currentPrice: "₹1,850",
      change: "+1.8%",
      trend: "up", 
      volume: "890 tons",
      high52Week: "₹2,100",
      low52Week: "₹1,650",
      forecast: "+5% (next month)",
      demandLevel: "High"
    }
  };

  const currentData = marketData[selectedCrop as keyof typeof marketData];

  const priceHistory = [
    { date: "Jan", price: 2100 },
    { date: "Feb", price: 2200 },
    { date: "Mar", price: 2350 },
    { date: "Apr", price: 2280 },
    { date: "May", price: 2450 },
  ];

  const nearbyBuyers = [
    {
      name: "AgriCorp Industries",
      location: "15 km away",
      rating: 4.8,
      price: "₹2,460/quintal",
      quantity: "500+ tons",
      type: "Processor",
      verified: true
    },
    {
      name: "Green Valley Foods", 
      location: "23 km away",
      rating: 4.6,
      price: "₹2,440/quintal",
      quantity: "200+ tons",
      type: "Wholesaler",
      verified: true
    },
    {
      name: "Farm Fresh Exports",
      location: "31 km away", 
      rating: 4.9,
      price: "₹2,480/quintal",
      quantity: "1000+ tons",
      type: "Exporter",
      verified: true
    }
  ];

  const priceAlerts = [
    {
      crop: "Rice",
      message: "Price increased by 5% - Good time to sell!",
      time: "2 hours ago",
      type: "opportunity"
    },
    {
      crop: "Wheat",
      message: "High demand expected next week",
      time: "5 hours ago", 
      type: "info"
    },
    {
      crop: "Corn",
      message: "New buyer registered in your area",
      time: "1 day ago",
      type: "buyer"
    }
  ];

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "corn", label: "Corn" },
    { value: "soybean", label: "Soybean" }
  ];

  const regions = [
    { value: "punjab", label: "Punjab" },
    { value: "haryana", label: "Haryana" },
    { value: "up", label: "Uttar Pradesh" },
    { value: "maharashtra", label: "Maharashtra" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-earth/10 to-earth/20 rounded-lg">
            <TrendingUp className="h-6 w-6 text-earth" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Market Analysis</h1>
            <p className="text-muted-foreground">Real-time commodity prices and direct marketplace</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.value} value={crop.value}>
                  {crop.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Set Price Alerts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Price Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Price Card */}
          <Card className="solution-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl capitalize">{selectedCrop} Prices</CardTitle>
                  <CardDescription>Current market rates in {regions.find(r => r.value === selectedRegion)?.label}</CardDescription>
                </div>
                <Badge variant={currentData.trend === "up" ? "default" : "destructive"}>
                  {currentData.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {currentData.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentData.currentPrice}</div>
                  <div className="text-sm text-muted-foreground">Current Price/Quintal</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-success">{currentData.high52Week}</div>
                  <div className="text-sm text-muted-foreground">52W High</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-destructive">{currentData.low52Week}</div>
                  <div className="text-sm text-muted-foreground">52W Low</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-warning">{currentData.volume}</div>
                  <div className="text-sm text-muted-foreground">Daily Volume</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-success">Price Forecast</h4>
                    <p className="text-sm text-muted-foreground">Expected trend for next month</p>
                  </div>
                  <div className="text-xl font-bold text-success">{currentData.forecast}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Price Trend (Last 5 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {priceHistory.map((point, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-gradient-to-t from-primary to-primary-glow rounded-t w-full relative group hover:shadow-glow transition-all duration-300"
                      style={{ 
                        height: `${(point.price / Math.max(...priceHistory.map(p => p.price))) * 200}px`,
                        minHeight: '20px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{point.price}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{point.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nearby Buyers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-accent" />
                Nearby Buyers
              </CardTitle>
              <CardDescription>Connect directly with verified buyers in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyBuyers.map((buyer, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-foreground">{buyer.name}</h4>
                          {buyer.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {buyer.location}
                          </span>
                          <span>⭐ {buyer.rating}</span>
                          <Badge variant="outline" className="text-xs">
                            {buyer.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">{buyer.price}</div>
                        <div className="text-xs text-muted-foreground">{buyer.quantity}</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Contact Buyer
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4" variant="outline">
                View All Buyers
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-success" />
                Market Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Demand Level:</span>
                  <Badge variant={currentData.demandLevel === "High" ? "default" : "secondary"}>
                    {currentData.demandLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Status:</span>
                  <span className="font-medium text-success">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered Buyers:</span>
                  <span className="font-medium">347</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Listings:</span>
                  <span className="font-medium">28</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-warning" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceAlerts.map((alert, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'opportunity' ? 'bg-success' :
                        alert.type === 'info' ? 'bg-primary' : 'bg-warning'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{alert.crop}</div>
                        <div className="text-xs text-muted-foreground">{alert.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Post Your Crop
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Buyers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Market Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Market Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-success/5 border border-success/20 rounded">
                  📈 Rice prices up 5.2% due to export demand
                </div>
                <div className="p-2 bg-primary/5 border border-primary/20 rounded">
                  🚚 New cold storage facility opened in your region
                </div>
                <div className="p-2 bg-warning/5 border border-warning/20 rounded">
                  🌧️ Monsoon forecast may affect wheat prices
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;