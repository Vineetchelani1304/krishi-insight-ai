import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/solutions/CropRecommendation";
import DiseaseDetection from "./pages/solutions/DiseaseDetection";
import CropPlanning from "./pages/solutions/CropPlanning";
import AIAssistant from "./pages/solutions/AIAssistant";
import MarketAnalysis from "./pages/solutions/MarketAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="crop-recommendation" element={<CropRecommendation />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="crop-planning" element={<CropPlanning />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="market-analysis" element={<MarketAnalysis />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/signup" element={<SignupPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
