import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Brain, 
  Camera, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Zap
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "Crop Recommendation",
      description: "AI-powered crop suggestions based on soil parameters, weather, and seasonal patterns.",
      color: "text-primary"
    },
    {
      icon: Camera,
      title: "Disease Detection",
      description: "Real-time plant disease identification using deep learning image analysis.",
      color: "text-accent"
    },
    {
      icon: Calendar,
      title: "Weekly Planning",
      description: "Dynamic crop management plans with irrigation and treatment schedules.",
      color: "text-success"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Multilingual chatbot for instant agricultural queries and guidance.",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time price trends and direct marketplace for better profits.",
      color: "text-earth"
    }
  ];

  const stats = [
    { label: "Active Farmers", value: "50,000+", icon: Users },
    { label: "Crops Analyzed", value: "2M+", icon: Leaf },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Yield Increase", value: "40%", icon: TrendingUp }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-success py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Revolutionize Your
              <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Agricultural Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
              AgriSense combines AI, machine learning, and agricultural expertise to maximize your crop yield,
              detect diseases early, and connect you directly with markets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground btn-hover-lift" asChild>
                <Link to="/auth/signup">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-success/20 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-warning/20 rounded-full blur-md animate-pulse delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Complete Agricultural Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform provides end-to-end agricultural solutions, from crop planning to market analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="feature-card group">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 mb-4 group-hover:shadow-lg transition-all duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Why Choose AgriSense?
              </h2>
              
              <div className="space-y-6">
                {[
                  "Increase crop yield by up to 40% with AI-driven insights",
                  "Reduce disease-related losses through early detection",
                  "Optimize resource usage and reduce costs",
                  "Access real-time market data for better pricing",
                  "Get personalized recommendations in your language"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <Button size="lg" className="mt-8 btn-hover-lift" asChild>
                <Link to="/auth/signup">
                  Get Started Today <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 p-8">
                <div className="w-full h-full bg-card rounded-xl shadow-strong flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="h-24 w-24 text-primary mx-auto mb-4 float-animation" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Smart Agriculture</h3>
                    <p className="text-muted-foreground">Powered by Advanced AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of farmers who have already revolutionized their agricultural practices with AgriSense.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground btn-hover-lift" asChild>
            <Link to="/auth/signup">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;